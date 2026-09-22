import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { CometSpinner } from '@/components/ui/comet-spinner';
import { FlipCard } from '@/components/ui/flip-card';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { ArrowRightIcon, CircleCheckBig, CircleX, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldSet,
  FieldDescription,
  FieldGroup,
  Field,
  FieldError,
} from '@/components/ui/field';
import { FloatingLabel } from '@/components/ui/floating-label-input';
import { useMutation } from '@tanstack/react-query';
import QueryProvider from '@/components/query-provider';
import type { ContactCopy } from '@/i18n';
import { Blobatar } from '@blobatar/react';
import { useGaze } from '@blobatar/react/gaze';
import { happy, idle, mad, thinking, unsure } from 'blobatar/expression';
import 'blobatar/motion.css';
import 'blobatar/gaze.css';

const access_key = 'e25d109e-87c5-431e-9bd5-89f4b0792f09';
const API_URL = 'https://api.web3forms.com/submit';

/** shared, because a canvas per keystroke is a canvas per keystroke */
let ruler: CanvasRenderingContext2D | null = null;

/**
 * Where the caret is, in client coordinates, so the blobatar can watch the
 * typing rather than the field. A textarea wraps, so measuring one line of it
 * would be a lie — those just get looked at.
 */
const caretAt = (field: HTMLInputElement | HTMLTextAreaElement) => {
  const box = field.getBoundingClientRect();
  const middle = { x: box.left + box.width / 2, y: box.top + box.height / 2 };

  if (field instanceof HTMLTextAreaElement) return middle;

  ruler ??= document.createElement('canvas').getContext('2d');
  if (!ruler) return middle;

  const style = getComputedStyle(field);
  ruler.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  const typed = field.value.slice(
    0,
    field.selectionStart ?? field.value.length,
  );
  const x =
    box.left +
    parseFloat(style.paddingLeft) +
    parseFloat(style.borderLeftWidth) +
    ruler.measureText(typed).width -
    field.scrollLeft;

  // a long value scrolls under the right edge; the caret cannot be past it
  return {
    x: Math.min(x, box.right - parseFloat(style.paddingRight)),
    y: middle.y,
  };
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The shortest the card stays turned round. The flip itself takes 700ms, and a
 * request can fail on DNS in less than a frame — without a floor the card
 * twitches and the comet is never seen, which reads as nothing having happened.
 */
const MIN_SENDING_MS = 900;

/** FlipCard turns on `duration-700`; this has to stay in step with it */
const FLIP_MS = 700;

const ContactMeForm = ({ copy }: { copy: ContactCopy }) => {
  const [status, setStatus] = useState<Status>('idle');
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // tailwind's md
    const wide = window.matchMedia('(min-width: 48rem)').matches;

    const animations = [
      { selector: '.contact-form-animation', x: 0, y: 150 },
      // md: the copy slides in from the side, stacked it comes up from below.
      // matchMedia here keeps one copy block in the DOM instead of two, which
      // duplicated the h2 and the paragraph for crawlers.
      wide
        ? { selector: '.contact-copy-animation', x: 150, y: 0 }
        : { selector: '.contact-copy-animation', x: 0, y: 150 },
    ];

    animations.forEach(({ selector, x, y }) => {
      const element = document.querySelector(selector);

      if (!element) return;

      gsap.from(element, {
        opacity: 0,
        x,
        y,
        scale: 0.95,
        duration: 0.9,
        delay: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
    });

    // parallax: the grid drifts slower than the form over it. It hangs 20%
    // above the section so sliding down never shows its top edge; the mask
    // already fades out the bottom one
    gsap.fromTo(
      grid.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: grid.current!.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }, [copy]);

  const { form } = copy;

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(3, form.name.errors.toShort)
          .max(100, form.name.errors.toLong),
        email: z
          .string()
          .email(form.email.errors.invalid)
          .max(100, form.email.errors.toLong),
        phone: z
          .string()
          .regex(/^\+?[0-9\s()-]{7,20}$/, form.phone.errors.invalid)
          .max(20, form.phone.errors.toLong),
        message: z.string().max(500, form.message.errors.toLong),
      }),
    [form],
  );

  type tSchema = {
    name: string;
    email: string;
    phone: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // the blobatar is generated from the name field, so it turns into the
  // visitor's own as they type, and its face mirrors the form back at them
  const name = watch('name');
  // the eyes are the one motion layer that is not a function of the clock, so
  // they need a driver; it writes the tracking straight onto .mo-eyes.
  // travel is in viewBox units and the face is 100 across, so at size 72 a
  // travel of 3 would be under 3 real pixels.
  //
  // `lookAt` is deliberately not passed as an option: the caret moves on every
  // keystroke, and the option is applied whenever it changes, so declaring it
  // would be a render per character to say what the function says directly.
  const { ref: gaze, lookAt } = useGaze({ travel: 10 });

  // constructing the driver aims it at nothing, so say what "nothing to type
  // into" means here
  useEffect(() => lookAt('pointer'), [lookAt]);

  const aim = (event: React.SyntheticEvent) => {
    const field = event.target;
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement
    ) {
      lookAt(caretAt(field));
    }
  };

  const expression =
    status === 'sending'
      ? thinking
      : status === 'sent'
        ? happy
        : status === 'error'
          ? mad
          : Object.keys(errors).length
            ? unsure
            : idle;

  const sendingSince = useRef(0);

  /** shows the outcome, but never before the card has finished turning round */
  const settle = (outcome: Status, then?: () => void) => {
    const left = MIN_SENDING_MS - (Date.now() - sendingSince.current);

    const show = () => {
      setStatus(outcome);
      then?.();
    };

    if (left <= 0) show();
    else setTimeout(show, left);
  };

  const { mutate } = useMutation({
    mutationFn: (dados: tSchema & { access_key: string }) =>
      axios.post(API_URL, dados),
    onMutate: () => {
      sendingSince.current = Date.now();
      setStatus('sending');
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        settle('error');
        return;
      }
      settle('sent', () =>
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.7 },
        }),
      );
    },
    onError: (err) => {
      console.log(err);
      settle('error');
    },
  });

  // The back face lags the status on the way out. Closing the error turns the
  // card round over 700ms, and the back is in view for all of it — swap it back
  // to the spinner on the spot and the visitor watches the error become a
  // loader as it leaves.
  const [backFace, setBackFace] = useState<'spinner' | 'error'>('spinner');

  useEffect(() => {
    if (status === 'sending' || status === 'error') {
      setBackFace(status === 'error' ? 'error' : 'spinner');
      return;
    }

    const turning = setTimeout(() => setBackFace('spinner'), FLIP_MS);
    return () => clearTimeout(turning);
  }, [status]);

  // both faces are positioned absolutely, so the flip card has no height of its
  // own; the form is the face that has one, and it changes with the language
  const formFace = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number>();

  useEffect(() => {
    const face = formFace.current;
    if (!face) return;

    const observer = new ResizeObserver(([entry]) =>
      setCardHeight(entry.contentRect.height),
    );
    observer.observe(face);

    return () => observer.disconnect();
  }, []);

  const enviaEmail = (data: tSchema) => {
    mutate({ access_key, ...data });
  };

  // the wait and the failure both live on the back, and the card stays turned
  // for them. That is what makes closing the error a flip: the way back to the
  // form is the card turning round again, not a panel disappearing
  const back = (
    <div className='h-full w-full rounded-2xl border border-border bg-card px-4 py-7 shadow-2xl flex flex-col items-center justify-center gap-4 text-center'>
      {backFace === 'error' ? (
        <>
          <CircleX className='size-10 text-destructive' />
          <h3 className='font-title text-xl text-balance w-full text-destructive'>
            {copy.modal.error.title}
          </h3>
          <p className='text-muted-foreground font-semibold'>
            {copy.modal.error.text}
          </p>
          {/* type='button' is load-bearing — Button sets no type, and a button
              in a form is a submit button, so this was sending it all again */}
          <Button
            type='button'
            variant='destructive'
            onClick={() => setStatus('idle')}
          >
            {copy.modal.close}
          </Button>
        </>
      ) : (
        <CometSpinner
          aria-label={copy.modal.sending}
          className='size-12 text-primary'
        />
      )}
    </div>
  );

  // sent is the one outcome the card turns back to say, so it goes on the front.
  // It covers the form rather than replacing it, which keeps the card at the
  // form's height and hides the swap behind a face that is turned away. It has
  // no way out on purpose: the message is gone, and the next thing to do is not
  // send it again
  const outcome = status === 'sent' && (
    // green-600 rather than the brighter 500: white on 500 is about 2.3:1, and
    // the heading is large text, which wants 3:1
    <div className='absolute inset-0 z-30 rounded-2xl border border-green-600 bg-green-600 px-4 py-7 shadow-2xl flex flex-col items-center justify-center gap-4 text-center text-white'>
      <CircleCheckBig className='size-10' />
      <h3 className='font-title text-xl text-balance w-full'>
        {copy.modal.sent.title}
      </h3>
    </div>
  );

  return (
    <section id='contactMeHomepage' className='relative overflow-hidden'>
      <div
        ref={grid}
        className='absolute inset-x-0 -top-[20%] bottom-0 z-0'
        style={{
          backgroundImage: `
        linear-gradient(to right, color-mix(in srgb, var(--color-primary) 10%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 10%, transparent) 1px, transparent 1px)
      `,
          backgroundSize: '50px 50px',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
        }}
      />
      {/* pb-16: the section hides overflow for the grid's parallax, which
          would clip the card's shadow-2xl (it reaches ~63px down) */}
      <div className='md:min-h-container p-6 pb-16 md:p-12 md:pb-16 mx-auto max-w-7xl flex justify-between items-center gap-6 md:gap-12 lg:gap-20 flex-col-reverse md:flex-row z-10 relative'>
        <form
          onSubmit={handleSubmit(enviaEmail)}
          // focus and select both bubble, so the four fields are covered once
          // here: onInput is the typing, onSelect the caret moving on its own
          onFocus={aim}
          onInput={aim}
          onSelect={aim}
          onBlur={() => lookAt('pointer')}
          className='contact-form-animation flex items-center justify-end flex-1 w-full'
        >
          <div className='relative max-w-full w-full md:w-md'>
            {/* outside the flip card on purpose: in it, the blobatar turns with
                the card and spends half the flip showing the viewer its back.
                Decorative — it says nothing the fields do not already say */}
            <Blobatar
              ref={gaze}
              name={name || 'blob'}
              traits={{ shape: 0.11 }}
              background='squircle'
              hue={275}
              expression={expression}
              animate='always'
              size={72}
              aria-hidden='true'
              // -right-4 and not further: the section's gutter is 24px and the
              // body hides overflow-x, so a wider pull clips the blob on mobile.
              // z-20 clears the floating labels, which sit at z-10; the blob
              // overlaps the first field's corner, so it must not eat its clicks
              className='pointer-events-none absolute -top-7 -right-4 z-20 drop-shadow-lg'
            />
            <FlipCard
              isFlipped={status === 'sending' || status === 'error'}
              // the measurement only lands after hydration, and this island is
              // client:visible; without a floor the server's card has no height
              // at all and the section below it rides up over the form
              style={{
                height: cardHeight,
                minHeight: cardHeight === undefined ? '34rem' : undefined,
              }}
              className='w-full'
              back={back}
              front={
                <div ref={formFace} className='relative'>
                  {outcome}
                  {/* the panel covers the form, but a covered field is still
                      tabbable and Enter in one still submits; a disabled
                      fieldset takes every control in it out at once */}
                  <FieldSet
                    disabled={status !== 'idle'}
                    className='relative bg-card w-full rounded-2xl p-7 shadow-2xl border border-border'
                  >
                    <FieldGroup>
                      <Field>
                        <FloatingLabel>
                          <FloatingLabel.Input
                            id='name'
                            {...register('name')}
                            aria-invalid={errors.name ? 'true' : 'false'}
                          />
                          <FloatingLabel.Label htmlFor='name'>
                            {form.name.label}
                          </FloatingLabel.Label>
                        </FloatingLabel>
                        {errors.name ? (
                          <FieldError>{errors.name.message}</FieldError>
                        ) : (
                          <FieldDescription>
                            {form.name.description}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <FloatingLabel>
                          <FloatingLabel.Input
                            id='email'
                            type='email'
                            {...register('email')}
                            aria-invalid={errors.email ? 'true' : 'false'}
                          />
                          <FloatingLabel.Label htmlFor='email'>
                            {form.email.label}
                          </FloatingLabel.Label>
                        </FloatingLabel>
                        {errors.email ? (
                          <FieldError>{errors.email.message}</FieldError>
                        ) : (
                          <FieldDescription>
                            {form.email.description}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <FloatingLabel>
                          <FloatingLabel.Input
                            id='phone'
                            type='tel'
                            {...register('phone')}
                            aria-invalid={errors.phone ? 'true' : 'false'}
                          />
                          <FloatingLabel.Label htmlFor='phone'>
                            {form.phone.label}
                          </FloatingLabel.Label>
                        </FloatingLabel>
                        {errors.phone ? (
                          <FieldError>{errors.phone.message}</FieldError>
                        ) : (
                          <FieldDescription>
                            {form.phone.description}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <FloatingLabel>
                          <FloatingLabel.Textarea
                            id='message'
                            {...register('message')}
                            aria-invalid={errors.message ? 'true' : 'false'}
                          />
                          <FloatingLabel.Label htmlFor='message'>
                            {form.message.label}
                          </FloatingLabel.Label>
                        </FloatingLabel>
                        {errors.message ? (
                          <FieldError>{errors.message.message}</FieldError>
                        ) : (
                          <FieldDescription>
                            {form.message.description}
                          </FieldDescription>
                        )}
                      </Field>
                    </FieldGroup>
                    <FieldGroup className='flex md:flex-row'>
                      <Button
                        effect='expandIcon'
                        size={'lg'}
                        icon={ArrowRightIcon}
                        iconPlacement='right'
                        type='submit'
                        className='md:flex-1'
                      >
                        {copy.button1}
                      </Button>
                      <Button
                        effect='expandIcon'
                        size={'lg'}
                        icon={Trash2}
                        iconPlacement='right'
                        variant={'outline'}
                        className='md:flex-1'
                        onClick={() => {
                          reset();
                        }}
                        type='button'
                      >
                        {copy.button2}
                      </Button>
                    </FieldGroup>
                  </FieldSet>
                </div>
              }
            />
          </div>
        </form>
        <div className='contact-copy-animation space-y-1.5 md:space-y-3 flex-1'>
          <h2 className='font-title text-4xl md:text-5xl text-center md:text-start'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground font-semibold max-w-2xl text-center md:text-start'>
            {copy.text}
          </p>
        </div>
      </div>
    </section>
  );
};

// react-query lives inside the island: an Astro page has no shared React tree
const ContactMeHomepage = ({ copy }: { copy: ContactCopy }) => (
  <QueryProvider>
    <ContactMeForm copy={copy} />
  </QueryProvider>
);

export default ContactMeHomepage;

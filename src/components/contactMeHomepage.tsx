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

/**
 * The form is the bottom of the shared card when stacked and its left half
 * from lg. The card has no fill of its own, so each face rounds the card's
 * corners it covers, and the flip shows the section through the turning half.
 */
const FORM_CORNERS = 'rounded-b-2xl lg:rounded-br-none lg:rounded-tl-2xl';

const ContactMeForm = ({ copy }: { copy: ContactCopy }) => {
  const [status, setStatus] = useState<Status>('idle');
  /** the services picked, by key; none is fine, not every message is a job */
  const [services, setServices] = useState<string[]>([]);
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // after osmo.supply's footer parallax: the section starts a quarter of its
    // height up and in shadow, and settles as its top travels up the screen,
    // so it reads as lying under the section before it. Eased out, so it is
    // all but over before the section is in place: a nav jump ends on lenis's
    // slow tail, and a linear fade was still visibly finishing during it
    gsap
      .timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section.current,
          start: 'clamp(top bottom)',
          end: 'clamp(top top)',
          scrub: true,
        },
      })
      .from(inner.current, { yPercent: -25 })
      .from(shade.current, { opacity: 0.5 }, 0);
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
    mutationFn: (dados: tSchema & { access_key: string; services?: string }) =>
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
    mutate({
      access_key,
      ...data,
      ...(services.length > 0 && { services: services.join(', ') }),
    });
  };

  // the wait and the failure both live on the back, and the card stays turned
  // for them. That is what makes closing the error a flip: the way back to the
  // form is the card turning round again, not a panel disappearing
  const back = (
    <div
      className={`h-full w-full bg-card px-4 py-7 flex flex-col items-center justify-center gap-4 text-center ${FORM_CORNERS}`}
    >
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
    <div
      className={`absolute inset-0 z-30 bg-green-600 px-4 py-7 flex flex-col items-center justify-center gap-4 text-center text-white ${FORM_CORNERS}`}
    >
      <CircleCheckBig className='size-10' />
      <h3 className='font-title text-xl text-balance w-full'>
        {copy.modal.sent.title}
      </h3>
    </div>
  );

  return (
    <section
      ref={section}
      id='contactMeHomepage'
      className='relative flex min-h-svh flex-col overflow-hidden'
    >
      <div ref={inner} className='relative flex flex-1 flex-col justify-center'>
        <div
          className='absolute inset-0 z-0'
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
        {/* py-16: the section hides overflow for its parallax, which would
          clip the card's shadow-2xl (it reaches ~63px down), and the same
          above keeps the card in the middle of the screen */}
        <div className='px-6 py-16 md:px-12 mx-auto max-w-7xl w-full z-10 relative'>
          {/* after aceternity's contact with dither image: the form and the
            photo are the two halves of one card, the photo on top when stacked */}
          <div className='grid rounded-2xl shadow-2xl ring-1 ring-border lg:grid-cols-2'>
            {/* the photo is dithered once, offline, to a few of its own
              colours, and shown unsmoothed so the stipple stays crisp; the copy
              rides on it. Stacked, it stands taller than the copy, so the rock
              shows above; side by side it takes the form's height */}
            <div className='relative flex min-h-120 items-end justify-center overflow-hidden rounded-t-2xl p-4 md:p-6 lg:order-last lg:min-h-0 lg:rounded-tl-none lg:rounded-r-2xl'>
              <img
                src='/contact/pedra-do-bau-dither.png'
                alt=''
                width={380}
                height={346}
                loading='lazy'
                decoding='async'
                className='absolute inset-0 size-full object-cover object-[50%_30%] [image-rendering:pixelated]'
              />
              <div
                aria-hidden
                className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-black/0 to-black/25'
              />
              <div className='relative w-full space-y-1.5 rounded-2xl bg-card/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm md:space-y-3 md:p-8'>
                <h2 className='font-title text-4xl md:text-5xl'>
                  {copy.title}
                </h2>
                <p className='text-muted-foreground font-semibold max-w-2xl'>
                  {copy.text}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(enviaEmail)}
              // focus and select both bubble, so the four fields are covered once
              // here: onInput is the typing, onSelect the caret moving on its own
              onFocus={aim}
              onInput={aim}
              onSelect={aim}
              onBlur={() => lookAt('pointer')}
              className='relative'
            >
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
                // sits centred on the seam with the photo: across it when
                // stacked (-top-9 is half its 72px), along it from lg.
                // -right-4 and not further: the section's gutter is 24px and the
                // body hides overflow-x, so a wider pull clips the blob on mobile.
                // z-20 clears the floating labels, which sit at z-10; the blob
                // overlaps the first field's corner, so it must not eat its clicks
                className='pointer-events-none absolute -top-9 -right-4 z-20 drop-shadow-lg lg:-top-7 lg:-right-9'
              />
              <FlipCard
                isFlipped={status === 'sending' || status === 'error'}
                // the measurement only lands after hydration, and this island is
                // client:visible; without a floor the server's card has no height
                // at all and the section below it rides up over the form
                style={{
                  height: cardHeight,
                  minHeight: cardHeight === undefined ? '38rem' : undefined,
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
                      className={`relative bg-card w-full p-7 ${FORM_CORNERS}`}
                    >
                      <FieldGroup>
                        <Field>
                          <span
                            id='services'
                            // the same type as the inputs' floating labels
                            className='text-sm leading-none font-medium text-muted-foreground'
                          >
                            {form.services.label}
                          </span>
                          {/* after creative-tim's agency brief: tiles split by
                            hairlines, any number of them on; outlined like
                            the inputs below them */}
                          <div
                            role='group'
                            aria-labelledby='services'
                            className='flex divide-x divide-primary/25 overflow-hidden rounded-lg border border-primary/25'
                          >
                            {Object.entries(form.services.options).map(
                              ([key, label]) => {
                                const on = services.includes(key);
                                return (
                                  <button
                                    key={key}
                                    type='button'
                                    aria-pressed={on}
                                    onClick={() =>
                                      setServices(
                                        on
                                          ? services.filter((s) => s !== key)
                                          : [...services, key],
                                      )
                                    }
                                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-[color,background-color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 ${on ? 'bg-foreground text-background' : 'bg-card text-muted-foreground hover:text-foreground'}`}
                                  >
                                    {label}
                                  </button>
                                );
                              },
                            )}
                          </div>
                          <FieldDescription>
                            {form.services.description}
                          </FieldDescription>
                        </Field>
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
                            setServices([]);
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
            </form>
          </div>
        </div>
      </div>
      {/* the shadow the section lies in until it is all the way up */}
      <div
        ref={shade}
        aria-hidden
        className='pointer-events-none absolute inset-0 z-20 bg-black opacity-0'
      />
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

import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { ArrowRightIcon, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState, useMemo } from 'react';
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

const access_key = 'e25d109e-87c5-431e-9bd5-89f4b0792f09';
const API_URL = 'https://api.web3forms.com/submit';

const ContactMeForm = ({ copy }: { copy: ContactCopy }) => {
  const [enviado, setEnviado] = useState<null | boolean>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animations = [
      { selector: '.contact-form-animation', x: 0, y: 150 },
      { selector: '.contact-copy-desktop-animation', x: 150, y: 0 },
      { selector: '.contact-copy-mobile-animation', x: 0, y: 150 },
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (dados: tSchema & { access_key: string }) =>
      axios.post(API_URL, dados),
    onMutate: () => setModalAberto(true),
    onSuccess: (res) => {
      if (res.status === 200) {
        setModalAberto(false);
        setEnviado(true);
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.7 },
        });
      } else {
        setEnviado(false);
        setModalAberto(false);
      }
    },
    onError: (err) => {
      console.log(err);
      setModalAberto(false);
      setEnviado(false);
    },
  });

  const enviaEmail = (data: tSchema) => {
    mutate({ access_key, ...data });
  };

  const handleModal = () => {
    setModalAberto(false);
    reset();

    setTimeout(() => {
      setEnviado(null);
    }, 150);
  };

  return (
    <section id='contactMeHomepage' className='relative'>
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
      <div className='md:min-h-container p-6 md:p-12 mx-auto max-w-7xl flex justify-between items-center gap-6 md:gap-12 lg:gap-20 flex-col-reverse md:flex-row z-10 relative'>
        <form
          onSubmit={handleSubmit(enviaEmail)}
          className='contact-form-animation flex items-center justify-end flex-1 w-full'
        >
          <FieldSet className='bg-card max-w-full w-full md:w-md rounded-2xl p-7 shadow-2xl border border-border'>
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
                  <FieldDescription>{form.name.description}</FieldDescription>
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
                  <FieldDescription>{form.email.description}</FieldDescription>
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
                  <FieldDescription>{form.phone.description}</FieldDescription>
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
        </form>
        <div className='contact-copy-desktop-animation hidden md:block space-y-1.5 md:space-y-3 flex-1'>
          <h2 className='font-title text-4xl md:text-5xl text-center md:text-start'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground font-semibold max-w-2xl text-center md:text-start'>
            {copy.text}
          </p>
        </div>
        <div className='contact-copy-mobile-animation md:hidden space-y-1.5 md:space-y-3 flex-1'>
          <h2 className='font-title text-4xl md:text-5xl text-center md:text-start'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground font-semibold max-w-2xl text-center md:text-start'>
            {copy.text}
          </p>
        </div>
      </div>
      <Dialog open={enviado === true} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{copy.modal.sent.title}</DialogTitle>
            <DialogDescription>{copy.modal.sent.text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleModal}>{copy.modal.close}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={enviado === false} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            {/* the old project printed the literal string "mod?.error.title" here */}
            <DialogTitle>{copy.modal.error.title}</DialogTitle>
            <DialogDescription>{copy.modal.error.text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleModal} variant={'destructive'}>
              {copy.modal.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={modalAberto} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle hidden={true}>{copy.modal.sending}</DialogTitle>
            <DialogDescription className='h-28 grid place-items-center'>
              <Spinner variant='ellipsis' />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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

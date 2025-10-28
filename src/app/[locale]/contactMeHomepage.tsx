'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { H2 } from '@/components/ui/h2';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import { P } from '@/components/ui/p';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { ArrowRightIcon, Trash2 } from 'lucide-react';
import { Variants } from 'motion/react';
import { useState, useMemo } from 'react';
import { useMessages } from '@/context/messages';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldSet,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';

const access_key = 'e25d109e-87c5-431e-9bd5-89f4b0792f09';
const API_URL = 'https://api.web3forms.com/submit';

const animation: Variants[] = [
  {
    hidden: { opacity: 0, x: 150, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        delay: 0.1,
      },
    },
  },
  {
    hidden: { opacity: 0, y: 150, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        delay: 0.1,
      },
    },
  },
];

const ContactMeHomepage = () => {
  const [enviado, setEnviado] = useState<null | boolean>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const t = useMessages('homepage');
  const { title, text, form, button1, button2, modal } = t('contactMe');

  const schema = useMemo(() => {
    if (!form) return null;
    return z.object({
      name: z.string().min(3, form.name?.error || 'Name is required'),
      email: z.string().email(form.email?.error || 'Invalid email'),
      phone: z
        .string()
        .regex(/^\+?[0-9\s()-]{7,20}$/, form.phone?.error || 'Invalid phone'),
      message: z.string(),
    });
  }, [form]);

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
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const enviaEmail = (data: tSchema) => {
    if (!schema) return;

    const dados = {
      access_key,
      ...data,
    };

    setModalAberto(true);
    axios
      .post(API_URL, dados)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
        setModalAberto(false);
        setEnviado(false);
      });
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
        <motion.form
          variants={animation[1]}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.15 }}
          onSubmit={handleSubmit(enviaEmail)}
          className='flex items-center justify-end flex-1 w-full'
        >
          <FieldSet className='bg-card max-w-full w-full md:w-md rounded-2xl p-7 shadow-2xl border border-border'>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='name'>{form?.name.label}</FieldLabel>
                <Input
                  required
                  className='!py-5 rounded-lg shadow-none border-primary/25'
                  id='name'
                  placeholder={form?.name.placeholder}
                  {...register('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name ? (
                  <FieldError>{errors.name.message}</FieldError>
                ) : (
                  <FieldDescription>{form?.name.description}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor='email'>{form?.email.label}</FieldLabel>
                <Input
                  required
                  className='!py-5 rounded-lg shadow-none border-primary/25'
                  id='email'
                  type='email'
                  placeholder={form?.email.placeholder}
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email ? (
                  <FieldError>{errors.email.message}</FieldError>
                ) : (
                  <FieldDescription>{form?.email.description}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor='phone'>{form?.phone.label}</FieldLabel>
                <Input
                  required
                  className='!py-5 rounded-lg shadow-none border-primary/25'
                  id='phone'
                  type='tel'
                  placeholder={form?.phone.placeholder}
                  {...register('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone ? (
                  <FieldError>{errors.phone.message}</FieldError>
                ) : (
                  <FieldDescription>{form?.phone.description}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor='message'>{form?.message.label}</FieldLabel>
                <Textarea
                  className='rounded-lg min-h-32 border-primary/25'
                  placeholder={form?.message.placeholder}
                  id='message'
                  {...register('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message ? (
                  <FieldError>{errors.message.message}</FieldError>
                ) : (
                  <FieldDescription>
                    {form?.message.description}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <FieldGroup className='flex flex-row'>
              <Button
                className='rounded-lg flex-1 py-6 font-bold border border-primary'
                effect='expandIcon'
                icon={ArrowRightIcon}
                iconPlacement='right'
                type='submit'
              >
                {button1}
              </Button>
              <Button
                effect='expandIcon'
                icon={Trash2}
                iconPlacement='right'
                variant={'outline'}
                className='rounded-lg flex-1 py-6 font-bold'
                onClick={() => {
                  reset();
                }}
                type='button'
              >
                {button2}
              </Button>
            </FieldGroup>
          </FieldSet>
        </motion.form>
        <motion.div
          variants={animation[0]}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.15 }}
          className='hidden md:block space-y-3 flex-1'
        >
          <H2 className='text-center md:text-start'>{title}</H2>
          <P className='text-center md:text-start'>{text}</P>
        </motion.div>
        <motion.div
          variants={animation[1]}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.15 }}
          className='md:hidden space-y-1.5 flex-1'
        >
          <H2 className='text-center md:text-start'>{title}</H2>
          <P className='text-center md:text-start'>{text}</P>
        </motion.div>
      </div>
      <Dialog open={enviado === true} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal?.sent.title}</DialogTitle>
            <DialogDescription>{modal?.sent.text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={enviado === false} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>mod?.error.title</DialogTitle>
            <DialogDescription>{modal?.error.text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleModal} variant={'destructive'}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={modalAberto} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle hidden={true}>{modal?.sending}</DialogTitle>
            <DialogDescription className='h-28 grid place-items-center'>
              <Spinner variant='ellipsis' />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactMeHomepage;

'use client';

import { ArrowRightIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, useInView } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { H2 } from '../ui/h2';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { P } from '../ui/p';
import { Textarea } from '../ui/textarea';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Spinner } from '../ui/spinner';

const access_key = 'e25d109e-87c5-431e-9bd5-89f4b0792f09';
const API_KEY = 'https://api.web3forms.com/submit';

const valoresCampoInicial = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContainerContact = () => {
  const [valoresCampo, setValoresCampo] = useState(valoresCampoInicial);
  const [enviado, setEnviado] = useState<null | boolean>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const formRef = useRef(null);
  const textRef = useRef(null);

  const isInViewForm = useInView(formRef, { once: true });
  const isInViewText = useInView(textRef, { once: true });

  const handleType = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setValoresCampo((atual) => ({
      ...atual,
      [id]: value,
    }));
  };

  const enviaEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dados = {
      access_key,
      ...valoresCampo,
    };

    setModalAberto(true);
    axios
      .post(API_KEY, dados)
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
    setValoresCampo(valoresCampoInicial);

    setTimeout(() => {
      setEnviado(null);
    }, 150);
  };

  return (
    <section
      id='containerContact'
      className='md:min-h-screen p-6 md:p-12 mx-auto max-w-7xl flex justify-between items-center gap-6 md:gap-12 lg:gap-20 flex-col-reverse md:flex-row'
    >
      <motion.form
        onSubmit={enviaEmail}
        className='flex items-center justify-end flex-1 w-full'
        ref={formRef}
        initial={{ opacity: 0, x: 100, scale: 0.95 }}
        animate={isInViewForm ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      >
        <Card className='max-w-full w-full md:w-md rounded-2xl'>
          <CardContent className='flex flex-col gap-5'>
            <div className='grid w-full items-center gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input
                required
                className='rounded-lg'
                type='name'
                id='name'
                placeholder='name'
                value={valoresCampo.name}
                onChange={handleType}
              />
            </div>
            <div className='grid w-full items-center gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input
                required
                className='rounded-lg'
                type='email'
                id='email'
                placeholder='email'
                value={valoresCampo.email}
                onChange={handleType}
              />
            </div>
            <div className='grid w-full items-center gap-3'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                required
                className='rounded-lg'
                type='phone'
                id='phone'
                placeholder='phone'
                value={valoresCampo.phone}
                onChange={handleType}
              />
            </div>
            <div className='grid w-full gap-3'>
              <Label htmlFor='message'>Your message</Label>
              <Textarea
                className='rounded-lg'
                placeholder='type your message here.'
                id='message'
                value={valoresCampo.message}
                onChange={handleType}
              />
            </div>
          </CardContent>
          <CardFooter className='flex gap-3'>
            <Button
              className='rounded-lg flex-1 py-6 font-bold border border-primary'
              effect='expandIcon'
              icon={ArrowRightIcon}
              iconPlacement='right'
              type='submit'
            >
              Submit
            </Button>
            <Button
              variant={'outline'}
              className='rounded-lg flex-1 py-6 font-bold'
              onClick={() => {
                setValoresCampo(valoresCampoInicial);
              }}
              type='button'
            >
              Clear
            </Button>
          </CardFooter>
        </Card>
      </motion.form>
      <motion.div
        className='flex flex-col flex-1 gap-5'
        ref={textRef}
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={isInViewText ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
      >
        <H2 className='text-center md:text-start'>Contact me!</H2>
        <P className='text-center md:text-start'>
          I’d love to hear from you! Whether you have a question, a project in
          mind, or just want to connect, feel free to reach out. I’m always open
          to new opportunities and collaborations.
        </P>
      </motion.div>
      <Dialog open={enviado === true} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent Successfully</DialogTitle>
            <DialogDescription>
              Thank you for reaching out! I’ll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={enviado === false} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Oops! Something Went Wrong</DialogTitle>
            <DialogDescription>
              Sorry, there was a problem sending your message. Please try again
              later or contact me directly at joaovitorcarmassi@email.com
            </DialogDescription>
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
            <DialogTitle hidden={true}>Sending</DialogTitle>
            <DialogDescription className='h-28 grid place-items-center'>
              <Spinner />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContainerContact;

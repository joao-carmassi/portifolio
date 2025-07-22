'use client';

import { H1 } from '@/components/ui/h1';
import { H2 } from '@/components/ui/h2';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import TextType from '../ui/text-type';

const HeroMain = () => {
  return (
    <section
      id='containerHero'
      className='min-h-screen bg-black bg-no-repeat bg-center bg-cover lg:bg-contain flex flex-col items-center justify-center gap-5 px-6 md:px-12'
      style={{
        backgroundImage: 'url("./ImgBg.webp")',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <H2 className='text-white drop-shadow-2xl drop-shadow-black'>
          Hello<span className='font-normal font-mono'>, my name is</span>
        </H2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <H1 className='text-white text-center drop-shadow-2xl drop-shadow-black font-mono'>
          João Vitor Carmassi
        </H1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <H2 className='text-white md:text-4xl drop-shadow-2xl drop-shadow-black'>
          <span className='font-normal font-mono'>I&apos;m</span>{' '}
          <span className='bg-accent text-accent-foreground px-3 py-2 rounded-xl'>
            <TextType
              text={[
                'a developer',
                'a coder',
                'a problem solver',
                'a gamer',
                'a frontender',
                'a tailwind lover',
                'a tech enthusiast',
                'always learning',
                'creating stuff',
                'building UI',
                'curious mind',
                'coffee powered',
                'ready to code',
              ]}
              typingSpeed={100}
              pauseDuration={6000}
              showCursor={true}
              cursorCharacter='_'
            />
          </span>
        </H2>
      </motion.div>
      <div className='flex gap-7'>
        <motion.a
          aria-label='Link para Github João Carmassi'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          href='https://github.com/joao-carmassi'
          target='_blank'
          className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white hover:bg-[#181717] text-white duration-200 hover:border-[#181717] hover:scale-110 cursor-pointer'
        >
          <Github />
        </motion.a>
        <motion.a
          aria-label='Link para Instagram João Carmassi'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          href='https://www.instagram.com/joao_carmassi/'
          target='_blank'
          className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white hover:bg-[#FF0069] text-white duration-200 hover:border-[#FF0069] hover:scale-110 cursor-pointer'
        >
          <Instagram />
        </motion.a>
        <motion.a
          aria-label='Link para Linkedin João Carmassi'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          href='https://www.linkedin.com/in/joao-carmassi/'
          target='_blank'
          className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white hover:bg-[#0a66c2] text-white duration-200 hover:border-[#0a66c2] hover:scale-110 cursor-pointer'
        >
          <Linkedin />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroMain;

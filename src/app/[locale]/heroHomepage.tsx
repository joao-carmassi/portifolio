'use client';

import RotatingText from '@/components/RotatingText';
import { cn } from '@/lib/utils';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useMessages } from '@/context/messages';

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.125,
      delayChildren: 0.15,
    },
  },
};

const animation: Variants = {
  hidden: { y: 90 },
  show: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
    },
  },
};

const HeroHomepage = () => {
  const t = useMessages('homepage');
  const { title, text1, text2 } = t('hero');

  return (
    <motion.section
      variants={container}
      initial='hidden'
      animate='show'
      id='heroHomepage'
      className='relative min-h-svh bg-black flex flex-col items-center justify-center'
    >
      <div
        className='absolute w-full h-full z-0 bg-no-repeat bg-center bg-cover lg:bg-contain animate-in fade-in duration-1000 delay-300 fill-mode-both'
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_BASE_PATH || ''
          }/ImgBg.webp')`,
        }}
      />
      <div className='px-6 md:px-12 relative z-10'>
        <div className='text-center space-y-3 md:space-y-6 '>
          <span className='block overflow-hidden'>
            <motion.h2
              variants={animation}
              className='scroll-m-20 md:text-3xl lg:text-4xl tracking-wide text-white drop-shadow-2xl text-3xl drop-shadow-black'
            >
              <span className='font-bold'>{text1?.bold}</span>
              {text1?.text}
            </motion.h2>
          </span>
          <span className='block overflow-hidden'>
            <motion.h1
              variants={animation}
              className={cn(
                'scroll-m-20 font-extrabold tracking-wide text-white drop-shadow-2xl drop-shadow-black text-4xl md:text-5xl lg:text-5xl'
              )}
            >
              {title}
            </motion.h1>
          </span>
          <span className='block overflow-hidden'>
            <motion.h2
              variants={animation}
              className='scroll-m-20 md:text-3xl lg:text-4xl tracking-wide text-white drop-shadow-2xl text-3xl drop-shadow-black font-normal'
            >
              <span className='flex items-center justify-center gap-1.5 transition-all duration-150'>
                <p>{text2?.static}</p>
                {text2?.list && (
                  <RotatingText
                    texts={text2.list}
                    mainClassName='px-2 sm:px-2 md:px-3 bg-secondary dark:bg-primary text-white overflow-hidden py-1 justify-center rounded-lg font-bold'
                    staggerFrom={'last'}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={3500}
                  />
                )}
              </span>
            </motion.h2>
          </span>
        </div>
        <div className='flex gap-6 w-fit mx-auto'>
          <span className='block overflow-hidden hover:scale-110 duration-200 pt-3 md:pt-6'>
            <motion.a
              variants={animation}
              aria-label='Link para Github João Carmassi'
              href='https://github.com/joao-carmassi'
              target='_blank'
              className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white text-white duration-200 transition-colors hover:border-[#181717] hover:bg-[#181717] focus:border-[#181717] focus:bg-[#181717] focus:scale-110 cursor-pointer'
            >
              <Github />
            </motion.a>
          </span>
          <span className='block overflow-hidden hover:scale-110 duration-200 pt-3 md:pt-6'>
            <motion.a
              variants={animation}
              aria-label='Link para Instagram João Carmassi'
              href='https://www.instagram.com/joao_carmassi/'
              target='_blank'
              className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white text-white duration-200 transition-colors hover:border-[#FF0069] hover:bg-[#FF0069] focus:border-[#FF0069] focus:bg-[#FF0069] focus:scale-110 cursor-pointer'
            >
              <Instagram />
            </motion.a>
          </span>
          <span className='block overflow-hidden hover:scale-110 duration-200 pt-3 md:pt-6'>
            <motion.a
              variants={animation}
              aria-label='Link para Linkedin João Carmassi'
              href='https://www.linkedin.com/in/joao-carmassi/'
              target='_blank'
              className='rounded-full grid place-items-center h-12 w-12 bg-black/25 backdrop-blur-sm border-2 border-white text-white duration-200 transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] focus:border-[#0a66c2] focus:bg-[#0a66c2] focus:scale-110 cursor-pointer'
            >
              <Linkedin />
            </motion.a>
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroHomepage;

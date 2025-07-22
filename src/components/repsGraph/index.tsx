'use client';

import IUserGithub from '@/types/IUser';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { H2 } from '../ui/h2';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChartLanguages } from './graph';
import { motion, useInView, Variants } from 'framer-motion';

const API_KEY = 'https://api.github.com/users/joao-carmassi';

const baixaUserGithub = () => {
  return axios.get(API_KEY).then((res) => res.data);
};

const RepsGraph = () => {
  const [user, setUser] = useState<undefined | IUserGithub>(undefined);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-250px 0px',
  });

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
    }),
  };

  useEffect(() => {
    baixaUserGithub().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <section id='containerGithub' className='bg-background relative'>
      <div className='absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'></div>
      <div className='flex relative z-10 flex-col gap-6 md:gap-12 mx-auto p-6 md:p-12 max-w-7xl'>
        <H2 className='text-center'>Github</H2>
        <div className='shadow-2xl max-w-4xl mx-auto'>
          <header className='bg-primary text-primary-foreground p-5'>
            <div>
              <a
                aria-label='Link para github Joao Carmassi'
                target='_blank'
                href={user?.html_url}
                className='flex items-center gap-3 group w-fit'
                rel='noreferrer'
              >
                <Avatar className='h-16 w-16 group-hover:ring-2 ring-primary-foreground duration-200'>
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <H2 className='text-primary-foreground group-hover:underline text-lg md:text-xl'>
                  {user?.login}
                </H2>
              </a>
            </div>
          </header>
          <main className='bg-card'>
            <div
              ref={containerRef}
              className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'
            >
              {[
                { label: 'Reps:', value: user?.public_repos },
                { label: 'Followers:', value: user?.followers },
                { label: 'Following:', value: user?.following },
                { label: 'Location:', value: user?.location },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className='p-4 rounded-lg border border-accent shadow-sm bg-background'
                  initial='hidden'
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={i}
                  variants={itemVariants}
                >
                  <h2 className='text-md font-semibold text-foreground/75'>
                    {item.label}
                  </h2>
                  <p className='text-lg md:text-xl text-primary break-all break-words'>
                    {item.value}
                  </p>
                </motion.div>
              ))}
              <motion.div
                className='col-span-full border border-accent p-4 rounded-lg shadow-sm bg-background'
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                custom={4}
                variants={itemVariants}
              >
                <h2 className='text-md font-semibold text-foreground/75'>
                  Bio:
                </h2>
                <p className='text-lg md:text-xl text-primary break-all break-words'>
                  {user?.bio}
                </p>
              </motion.div>
            </div>
            <div className='mx-auto max-w-3xl pb-4 pr-14'>
              <ChartLanguages />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default RepsGraph;

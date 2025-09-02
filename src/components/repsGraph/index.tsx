'use client';

import IUserGithub from '@/types/IUser';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { H2 } from '../ui/h2';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChartLanguages } from './graph';
import { motion, Variants } from 'framer-motion';

const API_KEY = 'https://api.github.com/users/joao-carmassi';

const baixaUserGithub = () => {
  return axios.get(API_KEY).then((res) => res.data);
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

const RepsGraph = () => {
  const [user, setUser] = useState<undefined | IUserGithub>(undefined);

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
                  <AvatarImage
                    alt='Iconi Github João Carmassi'
                    src={user?.avatar_url}
                  />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <H2 className='text-primary-foreground group-hover:underline text-lg md:text-xl'>
                  {user?.login}
                </H2>
              </a>
            </div>
          </header>
          <main className='bg-card'>
            <motion.div
              variants={container}
              viewport={{ once: true, amount: 0.25 }}
              initial='hidden'
              whileInView='show'
              className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'
            >
              {[
                { label: 'Reps:', value: user?.public_repos },
                { label: 'Followers:', value: user?.followers },
                { label: 'Following:', value: user?.following },
                { label: 'Location:', value: user?.location },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className='p-4 rounded-lg border border-accent shadow-sm bg-background'
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
                variants={fadeUp}
              >
                <h2 className='text-md font-semibold text-foreground/75'>
                  Bio:
                </h2>
                <p className='text-lg md:text-xl text-primary break-all break-words'>
                  {user?.bio}
                </p>
              </motion.div>
            </motion.div>
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

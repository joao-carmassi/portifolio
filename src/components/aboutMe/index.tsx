'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import adicionaFundoColorido from '@/utils/fundoColorido';
import { useEffect } from 'react';
import { H2 } from '../ui/h2';
import './aboutMe.css';

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    adicionaFundoColorido();
  }, []);

  return (
    <section
      id='containeAbout'
      className='header finisher-header grid place-items-center relative'
    >
      <div className='mx-auto max-w-7xl px-6 md:px-12 pt-12 pb-6 md:pb-12 flex flex-col items-center justify-center gap-10'>
        <H2 className='text-white drop-shadow-sm drop-shadow-black/25 tracking-wider text-center'>
          About me
        </H2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 150 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className='shadow-xl rounded-xl font-mono'
        >
          <div className='h-14 bg-white gap-4 px-5 rounded-t-xl flex justify-start items-center'>
            <span className='bg-red-500 w-4 aspect-square rounded-full block'></span>
            <span className='bg-yellow-400 w-4 aspect-square rounded-full block'></span>
            <span className='bg-green-400 w-4 aspect-square rounded-full block'></span>
          </div>
          <div className='containerCodigo font-semibold h-full text-white p-7 bg-gray-900 rounded-b-xl'>
            <span className='ponto'>{'{'}</span>
            <div>
              <p>
                &quot;full-name&quot;<span className='ponto'>: </span>
                <span> &quot;João Vitor Carmassi&quot;</span>
                <span className='virgula'>,</span>
              </p>
              <p>
                &quot;birthdate&quot;<span className='ponto'>: </span>
                <span>&quot;December 8, 2004&quot;</span>
                <span className='virgula'>,</span>
              </p>
              <p>
                &quot;place-of-birth&quot;<span className='ponto'>: </span>
                <span>&quot;São Paulo, SP&quot;</span>
                <span className='virgula'>,</span>
              </p>
              <p>
                &quot;where-I-live&quot;<span className='ponto'>: </span>
                <span>&quot;São Bento do Sapucai, SP&quot;</span>
                <span className='virgula'>,</span>
              </p>
              <p>
                &quot;languages&quot;<span className='ponto'>: </span>
                <span className='lista'>{'{'}</span>
              </p>
              <div>
                <p>
                  &quot;english&quot;<span className='ponto'>: </span>
                  <span>&quot;C1&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  &quot;spanish&quot;<span className='ponto'>: </span>
                  <span>&quot;B2&quot;</span>
                  <span className='virgula'>,</span>
                </p>
              </div>
              <span className='lista'>{'}'}</span>
              <span className='virgula'>,</span>
              <p>
                &quot;technologies&quot;<span className='ponto'>: </span>
                <span className='lista'>[</span>
                <span>
                  &quot;HTML&quot;
                  <span className='virgula'>,</span>
                  &quot;CSS&quot;
                  <span className='virgula'>,</span>
                  &quot;Tailwind&quot;
                  <span className='virgula'>,</span>
                  &quot;Sass&quot;
                  <span className='virgula'>,</span>
                  &quot;React&quot;
                  <span className='virgula'>,</span>
                  &quot;Next.Js&quot;
                  <span className='virgula'>,</span>
                  &quot;Git&quot;
                  <span className='virgula'>,</span>
                  &quot;Github&quot;
                  <span className='virgula'>,</span>
                  &quot;Eslint&quot;
                </span>
                <span className='lista'>]</span>
                <span className='virgula'>,</span>
              </p>
              <p>
                &quot;interests&quot;<span className='ponto'>: </span>
                <span className='lista'>[</span>
              </p>
              <div>
                <p>
                  <span>&quot;Programming&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Games&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Anime&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Music&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Movies&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Hiking&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Technology&quot;</span>
                  <span className='virgula'>,</span>
                </p>
                <p>
                  <span>&quot;Meeting new people and places&quot;</span>
                  <span className='virgula'>,</span>
                </p>
              </div>
              <span className='lista'>]</span>
              <span className='virgula'>,</span>
            </div>
            <span className='ponto'>{'}'}</span>
            <span className='virgula'>,</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;

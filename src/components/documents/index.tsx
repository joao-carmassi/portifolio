'use client';

import * as motion from 'motion/react-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { H2 } from '../ui/h2';
import { H3 } from '../ui/h3';
import { P } from '../ui/p';
import { useRef } from 'react';
import { useInView, Variants } from 'motion/react';

const documents = [
  {
    name: 'Resume (PT-BR)',
    title: 'Portuguese Version',
    bio: 'Web development resume in Portuguese.',
    imageUrl: './docs/img-curriculo-portugues.png',
    file: './docs/curriculo-joao-carmassi.pdf',
  },
  {
    name: 'Resume (EN)',
    title: 'English Version',
    bio: 'Web development resume in English.',
    imageUrl: './docs/img-curriculo-ingles.png',
    file: './docs/resume-joao-carmassi.pdf',
  },
  {
    name: 'MET C1 Certificate',
    title: 'Advanced English',
    bio: 'C1-level English proficiency certificate.',
    imageUrl: './docs/img-certificado-ingles.png',
    file: './docs/certificado-ingles.pdf',
  },
  {
    name: 'SIELE B2 Certificate',
    title: 'Intermediate Spanish',
    bio: 'B2-level Spanish proficiency certificate.',
    imageUrl: './docs/img-certificado-espanhol.png',
    file: './docs/certificado-espanhol.pdf',
  },
];

const Documents = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-250px 0px',
  });

  const directions = [
    { x: -100, y: 0 }, // left
    { x: 0, y: -100 }, // top
    { x: 0, y: 100 }, // bottom
    { x: 100, y: 0 }, // right
  ];

  const itemVariants: Variants = {
    hidden: (i: number) => ({
      opacity: 0,
      scale: 0.9,
      x: directions[i % 4].x,
      y: directions[i % 4].y,
    }),
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div
      id='containerResumes'
      className='flex flex-col justify-center mx-auto gap-6 md:gap-12 p-6 md:p-12 max-w-7xl'
    >
      <div className='text-center max-w-2xl mx-auto'>
        <H2>My Documents</H2>
        <P className='mt-6 text-base sm:text-lg'>
          Here are my resumes and official language proficiency certificates.
        </P>
      </div>

      <div
        className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12'
        ref={containerRef}
      >
        {documents.map((doc, i) => (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            key={doc.name}
            download={doc.name}
            href={doc.file}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={i}
            variants={itemVariants}
          >
            <Card className='py-5'>
              <CardHeader hidden>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className='w-full aspect-square rounded-lg object-cover bg-secondary object-top'
                    width={600}
                    height={600}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent className='px-5'>
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className='w-full aspect-square object-cover bg-secondary object-top'
                  width={600}
                  height={600}
                />
                <H3 className='mt-4 text-lg font-semibold'>{doc.name}</H3>
                <p className='text-muted-foreground text-sm'>{doc.title}</p>
                <p className='mt-3'>{doc.bio}</p>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Documents;

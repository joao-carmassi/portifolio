'use client';

import * as motion from 'motion/react-client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { H2 } from '../ui/h2';
import { H3 } from '../ui/h3';
import { P } from '../ui/p';
import { Variants } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

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

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.15,
    },
  },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

const Documents = () => {
  return (
    <section className='relative'>
      <div className='absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--accent)_100%)]'></div>
      <div
        id='containerResumes'
        className='relative flex flex-col justify-center mx-auto gap-6 md:gap-12 p-6 md:p-12 max-w-7xl '
      >
        <div className='text-center max-w-2xl mx-auto'>
          <H2>My Documents</H2>
          <P className='mt-6 text-base sm:text-lg'>
            Here are my resumes and official language proficiency certificates.
          </P>
        </div>
        <motion.div
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='w-full hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-6 md:gap-12'
        >
          {documents.map((doc) => (
            <motion.a
              className='hover:scale-105 duration-200'
              variants={fadeDown}
              aria-label={`download ${doc.title}`}
              key={doc.name}
              download={doc.name}
            >
              <Card className='py-5'>
                <CardHeader hidden>
                  <CardTitle>{doc.title}</CardTitle>
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
        </motion.div>
        <Carousel className='md:hidden'>
          <CarouselContent>
            {documents.map((doc) => (
              <CarouselItem key={doc.name}>
                <a
                  aria-label={`download ${doc.title}`}
                  download={doc.name}
                  href={doc.file}
                >
                  <Card className='py-5'>
                    <CardHeader hidden>
                      <CardTitle>{doc.title}</CardTitle>
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
                      <p className='text-muted-foreground text-sm'>
                        {doc.title}
                      </p>
                      <p className='mt-3'>{doc.bio}</p>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-4' />
          <CarouselNext className='-right-4' />
        </Carousel>
      </div>
    </section>
  );
};

export default Documents;

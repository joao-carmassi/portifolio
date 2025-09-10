import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { H2 } from '../../components/ui/h2';
import { P } from '../../components/ui/p';
import { H3 } from '../../components/ui/h3';
import { Variants } from 'motion/react';
import AnimatedDiv from '@/components/ui/animatedDiv';

const docs = [
  {
    category: 'English Certificate',
    title: 'Cambridge Michigan Language Assessments – MET C1',
    details:
      'Certified at the C1 Advanced level in English through the Michigan English Test (MET), demonstrating advanced proficiency in reading, writing, listening, and speaking.',
    img: './docs/img-certificado-ingles.webp',
    link: './docs/certificado-ingles.pdf',
  },
  {
    category: 'Spanish Certificate',
    title: 'SIELE – Spanish Proficiency B2',
    details:
      'Achieved a B2 level in Spanish with the SIELE certification, validating solid communication skills and advanced comprehension in the Spanish language.',
    img: './docs/img-certificado-espanhol.webp',
    link: './docs/certificado-espanhol.pdf',
  },
  {
    category: 'English Resume',
    title: 'Professional Resume in English',
    details:
      'Access my full resume in English, showcasing my skills, projects, and career journey with a global perspective in the tech industry.',
    img: './docs/img-curriculo-ingles.webp',
    link: './docs/resume-joao-carmassi.pdf',
  },
  {
    category: 'Portuguese Resume',
    title: 'Professional Resume in Portuguese',
    details:
      'Explore my complete resume in Portuguese, highlighting my background, technical expertise, and professional experiences in web development and beyond.',
    img: './docs/img-curriculo-portugues.webp',
    link: './docs/curriculo-joao-carmassi.pdf',
  },
];

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
    hidden: { opacity: 0, x: -150, scale: 0.95 },
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
];

const DocumentosHomepage = () => {
  return (
    <section
      id='documentosHomepage'
      className='max-w-7xl w-full p-6 md:p-12 mx-auto space-y-6 md:space-y-12'
    >
      <div className='space-y-3'>
        <H2 className='text-center'>My Portfolio & Achievements</H2>
        <P className='text-center'>
          Explore my resumes, certifications, and professional milestones in one
          place.
        </P>
      </div>
      <div className='w-full mx-auto space-y-12 md:space-y-20'>
        {docs.map((doc, index) => (
          <AnimatedDiv
            variants={animation[index % 2 === 0 ? 0 : 1]}
            initial='hidden'
            whileInView='show'
            viewport={{ amount: 0.3, once: true }}
            key={doc.category}
            className='flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse'
          >
            <div className='w-full max-h-96 aspect-[4/3] bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
              <img
                className='w-full h-full object-cover object-top hover:object-bottom duration-1000 delay-150'
                src={doc.img}
                alt={doc.title}
              />
            </div>
            <div className='basis-1/2 shrink-0 space-y-3'>
              <span className='uppercase font-medium text-sm text-accent'>
                {doc.category}
              </span>
              <H3>{doc.title}</H3>
              <P>{doc.details}</P>
              <Button
                effect={'expandIcon'}
                iconPlacement='right'
                icon={ArrowDown}
                className='rounded-none'
                asChild
              >
                <a aria-label={doc.category} href={doc.link} download>
                  Download
                </a>
              </Button>
            </div>
          </AnimatedDiv>
        ))}
      </div>
    </section>
  );
};

export default DocumentosHomepage;

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { H2 } from '../../components/ui/h2';
import { P } from '../../components/ui/p';
import { H3 } from '../../components/ui/h3';
import { Variants } from 'motion/react';
import { getMessages } from '@/utils/getMessages';
import Img from '@/components/Image';
import * as motion from 'motion/react-client';

interface DocumentItem {
  category: string;
  title: string;
  details: string;
  img: string;
  link: string;
}

const animation: Variants = {
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
};

const DocumentosHomepage = async ({ locale }: { locale: string }) => {
  const t = await getMessages(locale, 'homepage');
  const { title, text, docs } = t('documentos');

  return (
    <section
      id='documentosHomepage'
      className='max-w-7xl w-full p-6 md:p-12 mx-auto space-y-6 md:space-y-12'
    >
      <div className='space-y-1.5 md:space-y-3'>
        <H2 className='text-center'>{title}</H2>
        <P className='text-center'>{text}</P>
      </div>
      <div className='w-full mx-auto space-y-12 md:space-y-20'>
        {docs.map((doc: DocumentItem) => (
          <motion.div
            variants={animation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            key={doc.category}
            className='flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse'
          >
            <div className='w-full max-h-96 aspect-[4/3] bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
              <Img
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DocumentosHomepage;

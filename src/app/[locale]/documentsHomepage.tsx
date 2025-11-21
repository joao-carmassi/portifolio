'use client';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { H2 } from '../../components/ui/h2';
import { P } from '../../components/ui/p';
import { H3 } from '../../components/ui/h3';
import Img from '@/components/Image';
import { useMessages } from '@/context/messages';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

interface DocumentItem {
  category: string;
  title: string;
  details: string;
  img: string;
  link: string;
}

const DocumentosHomepage = () => {
  const sectionContainer = useRef<HTMLElement>(null);
  const t = useMessages('homepage');
  const { title, text, docs } = t('documentos');
  const width = useWindowWidth();

  useGSAP(() => {
    if (!docs || docs.length === 0 || width <= 768) return;

    const paiCertificados = document.getElementById('animatedCertificates');
    const items = gsap.utils.toArray(paiCertificados?.children || []);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionContainer.current,
        start: 'bottom bottom',
        scrub: 0.5,
        pin: true,
      },
    });

    tl.to(paiCertificados, {
      xPercent: -100 * (items.length - 1),
      ease: 'none',
    });
  }, [docs, width]);

  return (
    <section
      ref={sectionContainer}
      id='documentosHomepage'
      className='w-full min-h-container py-6 md:py-12 mx-auto flex flex-col gap-6 md:gap-12 justify-center'
    >
      <div className='space-y-1.5 md:space-y-3 px-6 md:px-12'>
        <H2 className='text-center'>{title}</H2>
        <P className='text-center'>{text}</P>
      </div>
      <div
        id='animatedCertificates'
        className='w-full flex flex-col md:flex-row mx-auto gap-12 md:gap-0'
      >
        {docs &&
          docs.map((doc: DocumentItem) => (
            <div key={doc.category} className='min-w-[100vw]'>
              <div className='max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-x-12 gap-y-6'>
                <div className='w-full max-h-96 aspect-[4/3] bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
                  <Img
                    className='w-full h-full object-cover object-top hover:object-bottom duration-1000 delay-150'
                    src={doc.img}
                    alt={doc.title}
                  />
                </div>
                <div className='basis-1/2 shrink-0 space-y-3 '>
                  <span className='uppercase font-semibold text-sm text-accent'>
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
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default DocumentosHomepage;

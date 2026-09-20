import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { P } from '@/components/ui/p';
import { H3 } from '@/components/ui/h3';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DocsCopy } from '@/i18n';

const DocumentosHomepage = ({ copy }: { copy: DocsCopy }) => {
  const sectionContainer = useRef<HTMLElement>(null);
  const width = useWindowWidth();
  const [resumeLang, setResumeLang] = useState('');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (width <= 768) return;

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
  }, [width]);

  return (
    <section
      ref={sectionContainer}
      id='documentosHomepage'
      className='bg-background w-full min-h-svh py-6 md:py-12 mx-auto flex flex-col gap-6 md:gap-12 justify-center'
    >
      <div className='space-y-1.5 md:space-y-3 px-6 md:px-12'>
        <h2 className='font-title text-4xl md:text-5xl text-center'>
          {copy.title}
        </h2>
        <p className='text-muted-foreground font-semibold max-w-2xl mx-auto text-center'>
          {copy.text}
        </p>
      </div>
      <div
        id='animatedCertificates'
        className='w-full flex flex-col md:flex-row mx-auto gap-12 md:gap-0'
      >
        {Object.values(copy.docs).map((doc) => (
          <div key={doc.category} className='min-w-screen'>
            <div className='max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-x-12 gap-y-6'>
              <div className='w-full max-h-96 aspect-4/3 bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
                <img
                  className='w-full h-full object-cover object-top hover:object-bottom duration-1000 delay-150'
                  src={doc.img}
                  alt={doc.title}
                  width={1280}
                  height={960}
                />
              </div>
              <div className='basis-1/2 shrink-0 space-y-3 '>
                <span className='uppercase font-semibold text-sm text-muted-foreground'>
                  {doc.category}
                </span>
                <H3>{doc.title}</H3>
                <P>{doc.details}</P>
                <Button
                  effect={'expandIcon'}
                  iconPlacement='right'
                  icon={ArrowDown}
                  className='rounded-none'
                  size={'lg'}
                  asChild
                >
                  <a aria-label={doc.category} href={doc.link} download>
                    {copy.download}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className='min-w-screen'>
          <div className='max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-x-12 gap-y-6'>
            <div className='w-full max-h-96 aspect-4/3 bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
              <img
                className='w-full h-full object-cover object-top hover:object-bottom duration-1000 delay-150'
                src={copy.resume.img}
                alt={copy.resume.title}
                width={542}
                height={382}
              />
            </div>
            <div className='basis-1/2 shrink-0 space-y-3 '>
              <span className='uppercase font-semibold text-sm text-muted-foreground'>
                {copy.resume.category}
              </span>
              <H3>{copy.resume.title}</H3>
              <P>{copy.resume.details}</P>
              <Dialog>
                <DialogTrigger
                  render={
                    <Button
                      effect={'expandIcon'}
                      iconPlacement='right'
                      icon={ArrowDown}
                      className='rounded-none'
                    />
                  }
                >
                  {copy.download}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className='gap-3'>
                    <DialogTitle>{copy.resume.dialog.title}</DialogTitle>
                    <DialogDescription>
                      {copy.resume.dialog.button}
                    </DialogDescription>
                    <Select
                      onValueChange={(value: string | null) =>
                        setResumeLang(value ?? '')
                      }
                    >
                      <SelectTrigger className='w-full md:w-45 border-border shadow-sm'>
                        <SelectValue
                          placeholder={copy.resume.dialog.placeholder}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(copy.resume.dialog.options).map(
                          (option) => (
                            <SelectItem value={option.lang} key={option.lang}>
                              {option.label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <DialogClose
                        render={
                          <Button
                            effect={'expandIcon'}
                            iconPlacement='right'
                            icon={ArrowDown}
                            className='rounded-none'
                            disabled={resumeLang === ''}
                            onClick={() => {
                              const selectedOption = Object.values(
                                copy.resume.dialog.options,
                              ).find((option) => option.lang === resumeLang);
                              if (selectedOption) {
                                const link = document.createElement('a');
                                link.href = selectedOption.link;
                                link.download = '';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }
                            }}
                          />
                        }
                      >
                        {copy.download}
                      </DialogClose>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentosHomepage;

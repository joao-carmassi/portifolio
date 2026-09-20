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

type DocItem = {
  category: string;
  title: string;
  details: string;
  img: string;
  link: string;
};

// copy from the old project's messages/pt.json -> homepage.documentos
const title = 'Meu Portfólio & Conquistas';
const text =
  'Explore meus currículos, certificações e marcos profissionais em um só lugar.';
const docs: DocItem[] = [
  {
    category: 'Certificado de Inglês',
    title: 'Avaliações de idiomas de Cambridge Michigan – MET C1',
    details:
      'Certificado no nível avançado C1 em inglês pelo Michigan English Test (MET), demonstrando proficiência avançada em leitura, escrita, compreensão auditiva e fala.',
    img: '/docs/img-certificado-ingles.webp',
    link: '/docs/certificado-ingles.pdf',
  },
  {
    category: 'Certificado de Espanhol',
    title: 'SIELE – Proficiência em Espanhol B2',
    details:
      'Alcançou o nível B2 em espanhol com a certificação SIELE, validando habilidades sólidas de comunicação e compreensão avançada da língua espanhola.',
    img: '/docs/img-certificado-espanhol.webp',
    link: '/docs/certificado-espanhol.pdf',
  },
];
const resume = {
  category: 'Currículo',
  title: 'Currículo Profissional',
  img: '/docs/img-curriculo-portugues.webp',
  details:
    'Acesse meu currículo completo, apresentando minhas habilidades, projetos e trajetória profissional na indústria de tecnologia.',
  dialog: {
    title: 'Meus currículos',
    button: 'Selecione o idioma para baixar meu currículo:',
    placeholder: 'Selecione o idioma',
    options: [
      {
        lang: 'en',
        label: 'Inglês',
        link: '/docs/resume-joao-carmassi.pdf',
      },
      {
        lang: 'pt',
        label: 'Português',
        link: '/docs/curriculo-joao-carmassi.pdf',
      },
    ],
  },
};

const DocumentosHomepage = () => {
  const sectionContainer = useRef<HTMLElement>(null);
  const width = useWindowWidth();
  const [resumeLang, setResumeLang] = useState('');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!docs || !resume || width <= 768) return;

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
  }, [docs, width, resume]);

  return (
    <section
      ref={sectionContainer}
      id='documentosHomepage'
      className='bg-background w-full min-h-container py-6 md:py-12 mx-auto flex flex-col gap-6 md:gap-12 justify-center'
    >
      <div className='space-y-1.5 md:space-y-3 px-6 md:px-12'>
        <h2 className='font-title text-5xl md:text-7xl text-center'>{title}</h2>
        <p className='text-muted-foreground font-semibold max-w-2xl mx-auto text-center'>
          {text}
        </p>
      </div>
      <div
        id='animatedCertificates'
        className='w-full flex flex-col md:flex-row mx-auto gap-12 md:gap-0'
      >
        {docs &&
          docs.map((doc: DocItem) => (
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
                    size={'lg'}
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
        {resume && (
          <div className='min-w-screen'>
            <div className='max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-x-12 gap-y-6'>
              <div className='w-full max-h-96 aspect-4/3 bg-muted rounded-xl border border-border/50 basis-1/2 shadow-lg'>
                <img
                  className='w-full h-full object-cover object-top hover:object-bottom duration-1000 delay-150'
                  src={resume.img}
                  alt={resume.title}
                  width={542}
                  height={382}
                />
              </div>
              <div className='basis-1/2 shrink-0 space-y-3 '>
                <span className='uppercase font-semibold text-sm text-accent'>
                  {resume.category}
                </span>
                <H3>{resume.title}</H3>
                <P>{resume.details}</P>
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
                    Download
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className='gap-3'>
                      <DialogTitle>{resume.dialog.title}</DialogTitle>
                      <DialogDescription>
                        {resume.dialog.button}
                      </DialogDescription>
                      <Select
                        onValueChange={(value: string | null) =>
                          setResumeLang(value ?? '')
                        }
                      >
                        <SelectTrigger className='w-full md:w-45 border-border shadow-sm'>
                          <SelectValue
                            placeholder={resume.dialog.placeholder}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {resume.dialog.options.map(
                            (option: {
                              lang: string;
                              label: string;
                              link: string;
                            }) => (
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
                                const selectedOption =
                                  resume.dialog.options.find(
                                    (option: {
                                      lang: string;
                                      label: string;
                                      link: string;
                                    }) => option.lang === resumeLang,
                                  );
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
                          Download
                        </DialogClose>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentosHomepage;

import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ClipboardCheck,
  CodeXml,
  Gauge,
  MessageCircle,
  Palette,
  Search,
  Wrench,
} from 'lucide-react';
import { videos } from '@/components/about/videos';
import { FPS, type AboutVideo } from '@/components/about/videos/types';
import { Button } from '@/components/ui/button';
import { siGithub } from 'simple-icons';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// lucide v1 dropped brand icons, so the GitHub mark comes from simple-icons
const GithubIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' className='size-4'>
    <path d={siGithub.path} />
  </svg>
);

const cards = [
  {
    title: 'O que eu faço',
    lead: 'Design e código com a mesma pessoa — você não contrata dois.',
    items: [
      {
        icon: Palette,
        text: 'Layout feito do zero para o seu negócio, sem tema pronto.',
      },
      {
        icon: Gauge,
        text: 'Site que abre rápido no 4G, com Core Web Vitals medidos.',
      },
      {
        icon: CodeXml,
        text: 'HTML semântico e dados estruturados, para o Google ler o site.',
      },
    ],
    button: { label: 'Me conta seu projeto', href: '#contactMeHomepage' },
  },
  {
    title: 'Como eu trabalho',
    lead: 'Escopo combinado antes, link no ar e SEO desde o primeiro dia.',
    items: [
      {
        icon: Search,
        text: 'Pesquiso as palavras que o seu cliente digita no seu setor.',
      },
      {
        icon: ClipboardCheck,
        text: 'Audito com as ferramentas do Google e corrijo o que elas apontam.',
      },
      {
        icon: MessageCircle,
        text: 'Converso em português claro, sem jargão para inflar preço.',
      },
      {
        icon: Wrench,
        text: 'Depois do lançamento, ajustes e manutenção continuam comigo.',
      },
    ],
    button: {
      label: 'Ver no GitHub',
      href: 'https://github.com/joao-carmassi',
      external: true,
    },
  },
];

const VideoPlayer = ({
  video,
  reduced,
}: {
  video: AboutVideo;
  reduced: boolean;
}) => {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) player.current?.play();
      else player.current?.pause();
    });
    io.observe(box.current!);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={box} aria-hidden='true' className='absolute inset-0'>
      <Player
        ref={player}
        component={video.component}
        durationInFrames={video.durationInFrames}
        fps={FPS}
        compositionWidth={video.width}
        compositionHeight={video.height}
        // reduced motion: never play, show the final held frame
        initialFrame={reduced ? video.durationInFrames - 1 : 0}
        loop
        // no audio: unmuted players wait on AudioContext.resume(), which never
        // resolves without a user gesture (scroll isn't one), freezing frame 0
        initiallyMuted
        numberOfSharedAudioTags={0}
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const InfoCard = ({
  card,
  className,
}: {
  card: (typeof cards)[number];
  className: string;
}) => (
  <div
    className={`dark bg-black text-foreground rounded-3xl p-6 md:p-8 flex flex-col gap-6 ${className}`}
  >
    <div className='space-y-2'>
      <h3 className='font-title text-3xl md:text-4xl'>{card.title}</h3>
      <p className='text-muted-foreground font-semibold'>{card.lead}</p>
    </div>
    <ul className='space-y-4'>
      {card.items.map(({ icon: Icon, text }) => (
        <li key={text} className='flex items-start gap-3'>
          <Icon className='shrink-0 text-muted-foreground' />
          <p className='-mt-0.5 text-muted-foreground font-medium'>{text}</p>
        </li>
      ))}
    </ul>
    <Button
      asChild
      size='lg'
      effect='expandIcon'
      icon={card.button.external ? GithubIcon : ArrowRight}
      iconPlacement='right'
      className='w-full mt-auto rounded-full'
    >
      <a
        href={card.button.href}
        {...(card.button.external && {
          target: '_blank',
          rel: 'noreferrer noopener',
        })}
      >
        {card.button.label}
      </a>
    </Button>
  </div>
);

const VideoCard = ({
  video,
  reduced,
  className,
}: {
  video: AboutVideo;
  reduced: boolean | null;
  className: string;
}) => (
  <figure
    style={{ '--ar': `${video.width} / ${video.height}` } as React.CSSProperties}
    className={`dark relative overflow-hidden rounded-3xl bg-black aspect-[var(--ar)] ${className}`}
  >
    {reduced !== null && <VideoPlayer video={video} reduced={reduced} />}
    <figcaption className='sr-only'>
      {video.title}. {video.srText}
    </figcaption>
  </figure>
);

const AboutMeHomepage = () => {
  const section = useRef<HTMLElement>(null);
  // null until mounted: initialFrame is only read on mount, so wait for matchMedia
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // same entrance as the old github section: every cell flies in from its own side
      const moves = [
        { selector: '.about-card-top', x: 0, y: -150 },
        { selector: '.about-media-right', x: 150, y: 0 },
        { selector: '.about-media-left', x: -150, y: 0 },
        { selector: '.about-card-bottom', x: 0, y: 150 },
      ];

      moves.forEach(({ selector, x, y }) => {
        gsap.from(selector, {
          autoAlpha: 0,
          x,
          y,
          scale: 0.95,
          duration: 0.9,
          delay: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: selector, start: 'top 85%', once: true },
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id='aboutMeHomepage'
      className='p-6 md:py-12 md:px-24 bg-card'
    >
      {/* no max width: the section spans the same gutter as the hero frame */}
      <div className='space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <h2 className='font-title text-5xl md:text-6xl'>Sobre mim</h2>
          <p className='text-muted-foreground font-semibold max-w-2xl'>
            Faço sites do rascunho até o ar — design e código. Nos vídeos, quem
            eu sou e um projeto nascendo; nos cards, o que eu entrego e como a
            gente trabalha junto.
          </p>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-[minmax(0,1fr)_min(calc(33.333%-16px),calc((100svh-7.5rem)*2.34-100%))_minmax(0,1fr)] gap-6'>
          <InfoCard
            card={cards[0]}
            className='about-card-top col-span-1 md:col-span-2 lg:col-span-1'
          />
          <VideoCard
            video={videos[0]}
            reduced={reduced}
            className='about-media-right col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2'
          />
          <VideoCard
            video={videos[1]}
            reduced={reduced}
            className='about-media-left col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2'
          />
          <InfoCard
            card={cards[1]}
            className='about-card-bottom col-span-1 md:col-span-2 lg:col-span-1'
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMeHomepage;

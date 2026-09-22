import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ClipboardCheck,
  CodeXml,
  Gauge,
  Palette,
  Search,
  Wrench,
} from 'lucide-react';
import type { VideoImages } from '@/components/about/videos/types';
import { Button } from '@/components/ui/button';
import type { AboutCopy } from '@/i18n';
import { siGithub } from 'simple-icons';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// remotion is the heaviest thing on the page; a page with videos off never loads it
const AboutVideoPlayer = lazy(() => import('@/components/about/videoPlayer'));

// lucide v1 dropped brand icons, so the GitHub mark comes from simple-icons
const GithubIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' className='size-4'>
    <path d={siGithub.path} />
  </svg>
);

// only the parts that are not text: the copy lives in src/locales/*/about.json
const cards = [
  {
    icons: [Palette, Gauge, CodeXml],
    button: { href: '#contactMeHomepage' },
  },
  {
    icons: [Search, ClipboardCheck, Wrench],
    button: { href: 'https://github.com/joao-carmassi', external: true },
  },
];

type CardCopy = AboutCopy['cards']['0'];

const InfoCard = ({
  card,
  copy,
  className,
}: {
  card: (typeof cards)[number];
  copy: CardCopy;
  className: string;
}) => (
  <div
    className={`dark bg-black text-foreground rounded-3xl p-6 md:p-8 flex flex-col gap-6 ${className}`}
  >
    <div className='space-y-2'>
      <h3 className='font-title text-3xl md:text-4xl'>{copy.title}</h3>
      <p className='text-muted-foreground font-semibold'>{copy.lead}</p>
    </div>
    <ul className='space-y-4'>
      {Object.values(copy.items).map((text, i) => {
        const Icon = card.icons[i];
        return (
          <li key={text} className='flex items-start gap-3'>
            <Icon className='shrink-0 text-muted-foreground' />
            <p className='-mt-0.5 text-muted-foreground font-medium'>{text}</p>
          </li>
        );
      })}
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
        {copy.button}
      </a>
    </Button>
  </div>
);

// both compositions are 1920x820 at heart (1440x615 is the same ratio), which
// the grid's 2.34 above leans on too
const MediaCard = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => (
  <figure
    className={`dark relative overflow-hidden rounded-3xl bg-black aspect-[1920/820] ${className}`}
  >
    {children}
  </figure>
);

const AboutMeHomepage = ({
  copy,
  images = {},
  videos = true,
}: {
  copy: AboutCopy;
  /** optimised by the page: astro:assets cannot run inside a Remotion player */
  images?: VideoImages;
  /** false leaves the two cards plain black, for the lighter /100 */
  videos?: boolean;
}) => {
  const section = useRef<HTMLElement>(null);
  // null until mounted: initialFrame is only read on mount, so wait for matchMedia
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // the grid only splits into columns at lg, so only there does flying in
      // from each cell's own side mean anything; stacked, everything rises
      const wide = window.matchMedia('(min-width: 64rem)').matches;
      const moves = [
        { selector: '.about-card-top', x: 0, y: wide ? -150 : 150 },
        { selector: '.about-media-right', x: wide ? 150 : 0, y: wide ? 0 : 150 },
        { selector: '.about-media-left', x: wide ? -150 : 0, y: wide ? 0 : 150 },
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

      // parallax: the two black cards drift hard against each other, the
      // videos slightly the other way. yPercent, so it stacks on the
      // entrance's y instead of fighting it. Stacked on small screens the
      // drift just reads as jitter
      if (!wide) return;
      [
        { selector: '.about-card-top', from: 16, to: -16 },
        { selector: '.about-media-right', from: -6, to: 6 },
        { selector: '.about-media-left', from: 6, to: -6 },
        { selector: '.about-card-bottom', from: -16, to: 16 },
      ].forEach(({ selector, from, to }) => {
        gsap.fromTo(
          selector,
          { yPercent: from },
          {
            yPercent: to,
            ease: 'none',
            scrollTrigger: {
              trigger: section.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id='aboutMeHomepage'
      className='p-6 md:p-12 lg:px-24 bg-card'
    >
      {/* no max width: the section spans the same gutter as the hero frame */}
      <div className='space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <h2 className='font-title text-4xl md:text-5xl'>{copy.title}</h2>
          <p className='text-muted-foreground font-semibold max-w-2xl'>
            {copy.intro}
          </p>
        </div>
        <div className='grid lg:grid-cols-[minmax(0,1fr)_min(calc(33.333%-16px),calc((100svh-7.5rem)*2.34-100%))_minmax(0,1fr)] gap-6'>
          <InfoCard
            card={cards[0]}
            copy={copy.cards['0']}
            className='about-card-top lg:col-span-1'
          />
          {(['quem-sou-eu', 'da-ideia-ao-deploy'] as const).map((id, i) => {
            const { title, srText } = copy.videos[id];
            return (
              <MediaCard
                key={id}
                className={
                  i === 0
                    ? 'about-media-right lg:col-span-2 lg:self-end'
                    : 'about-media-left lg:col-span-2 lg:self-start'
                }
              >
                {videos && reduced !== null && (
                  <Suspense fallback={null}>
                    <AboutVideoPlayer
                      id={id}
                      copy={copy.videos}
                      images={images}
                      reduced={reduced}
                    />
                  </Suspense>
                )}
                {videos && (
                  <figcaption className='sr-only'>
                    {title}. {srText}
                  </figcaption>
                )}
              </MediaCard>
            );
          })}
          <InfoCard
            card={cards[1]}
            copy={copy.cards['1']}
            className='about-card-bottom lg:col-span-1'
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMeHomepage;

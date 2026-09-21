import { GrainGradient } from '@paper-design/shaders-react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/ui/magnetic';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import HeroNav from '@/components/heroNav';
import type { HeroCopy, NavCopy } from '@/i18n';

gsap.registerPlugin(useGSAP, SplitText);

/** The second beat: the frame closes back in and the rest of the copy arrives.
 *  The pull cord waits for this so it drops with it instead of on its own. */
const STAGE_2 = 'hero:stage2';
const announceStage2 = () => {
  // the attribute covers an island that hydrates after the event already fired
  document.documentElement.dataset.heroStage = '2';
  dispatchEvent(new Event(STAGE_2));
};

const HeroHomepage = ({
  copy,
  navCopy,
}: {
  copy: HeroCopy;
  navCopy: NavCopy;
}) => {
  const frame = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const content = '.hero-content';
      // data-intro keeps the hero full-bleed (no frame, no radius) until hydration
      frame.current!.removeAttribute('data-intro');
      section.current!.removeAttribute('data-intro');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([content, '.hero-nav'], { autoAlpha: 1 });
        announceStage2();
        return;
      }

      const { padding } = getComputedStyle(frame.current!);
      const { borderRadius } = getComputedStyle(section.current!);
      const tl = gsap.timeline();
      // frame + colored background come back together, while the title leaves the center
      tl.fromTo(
        frame.current,
        { padding: 0 },
        { padding, duration: 1.25, ease: 'expo.inOut', clearProps: 'padding' },
        2,
      )
        .fromTo(
          section.current,
          { borderRadius: 0 },
          {
            borderRadius,
            duration: 1.25,
            ease: 'expo.inOut',
            clearProps: 'borderRadius',
          },
          2,
        )
        .from('.hero-bg', { autoAlpha: 0, duration: 5, ease: 'power3.out' }, 2);

      const title = section.current!.querySelector('.hero-title')!;
      const rect = title.getBoundingClientRect();
      // aria: 'none' — SplitText's default hides the chars and puts an
      // aria-label on what it split, but that is a <span>, and aria-label is
      // prohibited on a generic role. The <h1> carries the name instead
      const { chars } = SplitText.create(title, { type: 'chars', aria: 'none' });

      tl.from(
        chars,
        {
          autoAlpha: 0,
          yPercent: 100,
          duration: 1,
          stagger: 0.06,
          ease: 'power3.out',
        },
        0.5,
      )
        // title starts centered on screen and scaled up, then slides to its place
        .from(
          title,
          {
            x: innerWidth / 2 - (rect.left + rect.width / 2),
            y: innerHeight / 2 - (rect.top + rect.height / 2),
            scale: 1.5,
            duration: 1.25,
            ease: 'expo.inOut',
          },
          2,
        )
        .from(
          '.hero-entry',
          {
            autoAlpha: 0,
            yPercent: 100,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
          },
          2.5,
        );

      tl.call(announceStage2, undefined, 2);

      // from() tweens already hid everything, safe to reveal the wrappers
      gsap.set([content, '.hero-nav'], { autoAlpha: 1 });
    },
    { scope: section },
  );

  return (
    <div
      ref={frame}
      data-intro
      // the hero section itself starts below this frame's padding; anchoring to
      // the frame is what actually lands the page back at zero
      id='top'
      className='flex-1 min-w-0 flex p-6 md:p-12 lg:p-24 data-intro:p-0 bg-card'
    >
      <section
        ref={section}
        data-intro
        id='heroHomepage'
        className='dark bg-black text-foreground flex-1 rounded-3xl data-intro:rounded-none p-6 md:p-12 lg:p-24 relative overflow-hidden'
      >
        <div className='hero-bg absolute inset-0'>
          <GrainGradient
            width='100%'
            height='100%'
            colors={['#7300ff', '#eba8ff', '#00bfff', '#2b00ff']}
            colorBack='#000000'
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape='corners'
            speed={0.4}
            rotation={90}
          />
        </div>

        <HeroNav copy={navCopy} />

        {/* stacked: content sits at the bottom; xl: side by side, still bottom-left */}
        <div className='hero-content invisible relative z-10 w-full h-full flex flex-col items-end justify-end gap-y-8 gap-x-4 xl:flex-row xl:justify-start'>
          <div className='w-full space-y-6 md:space-y-10 xl:w-1/2'>
            {/* the name lives on the heading, where aria-label is allowed, and
                the three lines are hidden: SplitText shreds the middle one into
                per-character spans, which is not a thing to read out */}
            <h1
              className='font-title text-5xl md:text-7xl text-shadow-lg'
              aria-label={`${copy.title.line1} ${copy.title.line2} ${copy.title.line3}`}
            >
              <span aria-hidden='true' className='hero-entry block'>
                {copy.title.line1}
              </span>
              <span aria-hidden='true' className='hero-title block w-fit'>
                {copy.title.line2}
              </span>
              <span aria-hidden='true' className='hero-entry block'>
                {copy.title.line3}
              </span>
            </h1>
            <p className='hero-entry opacity-80 font-semibold max-w-lg'>
              {copy.text1}
            </p>
            <div className='flex flex-wrap gap-4'>
              <div className='hero-entry'>
                <Magnetic>
                  <Button
                    asChild
                    variant='secondary'
                    effect='shineHover'
                    size='lg'
                    className='rounded-full'
                  >
                    <a href='#aboutMeHomepage'>
                      {copy.button1}
                      <ArrowRight className='-rotate-45' />
                    </a>
                  </Button>
                </Magnetic>
              </div>
              <div className='hero-entry'>
                <Magnetic>
                  <Button
                    asChild
                    variant='default'
                    effect='pulsating'
                    size='lg'
                    className='rounded-full'
                  >
                    <a href='#contactMeHomepage'>
                      {copy.button2}
                      <ArrowRight className='-rotate-45' />
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroHomepage;

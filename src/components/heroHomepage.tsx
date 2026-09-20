import { GrainGradient } from '@paper-design/shaders-react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/ui/magnetic';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

const HeroHomepage = () => {
  const frame = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const content = '.hero-content';
      // data-intro keeps the hero full-bleed (no frame, no radius) until hydration
      frame.current!.removeAttribute('data-intro');
      section.current!.removeAttribute('data-intro');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(content, { autoAlpha: 1 });
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
      const { chars } = SplitText.create(title, { type: 'chars' });

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

      // from() tweens already hid everything, safe to reveal the wrapper
      gsap.set(content, { autoAlpha: 1 });
    },
    { scope: section },
  );

  return (
    <div
      ref={frame}
      data-intro
      className='flex-1 flex p-6 md:p-12 lg:p-24 data-intro:p-0 bg-card'
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

        {/* stacked: content sits at the bottom; xl: side by side, still bottom-left */}
        <div className='hero-content invisible relative z-10 w-full h-full flex flex-col items-end justify-end gap-y-8 gap-x-4 xl:flex-row xl:justify-start'>
          <div className='w-full space-y-10 xl:w-1/2'>
            <h1 className='font-title text-5xl md:text-7xl text-shadow-lg'>
              <span className='hero-entry block'>João Vitor</span>
              <span className='hero-title block w-fit'>Carmassi,</span>
              <span className='hero-entry block'>desenvolvedor</span>
            </h1>
            <p className='hero-entry text-muted-foreground font-semibold max-w-lg'>
              Criando experiências web perfeitas com tecnologias modernas e
              paixão por inovação.
            </p>
            <div className='flex gap-4'>
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
                      Sobre mim
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
                      Contato
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

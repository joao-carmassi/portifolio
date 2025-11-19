'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

import { Button } from '@/components/ui/button';
import scrollToContainer from '@/utils/scrowToContainer';
import DarkVeil from '@/components/DarkVeil';

interface Props {
  title: {
    line1: string;
    line2: string;
    line3: string;
  };
  text1: string;
  text2: string;
  button1: string;
  button2: string;
}

const HeroHomepage = ({ title, text1, text2, button1, button2 }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    if (!domLoaded) return;

    const split = new SplitText('#animetatedTitle', {
      type: 'chars',
    });

    gsap.from(split.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      delay: 0.5,
      stagger: 0.06,
      ease: 'power3.out',
      onStart: () => {
        document
          .querySelector('.invisibleOnLoad')!
          .classList.remove('invisibleOnLoad');
      },
    });

    const el = document.getElementById('animetatedTitle');
    const rect = el!.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = centerX - (rect.left + rect.width / 2);
    const deltaY = centerY - (rect.top + rect.height / 2);

    const tl = gsap.timeline();

    tl.from(
      el,
      {
        x: deltaX,
        y: deltaY,
        delay: 1,
        duration: 1.25,
        ease: 'expo.inOut',
        scale: 1.5,
      },
      1
    );

    tl.from(
      '.hiddenEntry',
      {
        opacity: 0,
        yPercent: 100,
        delay: 1.5,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.05,
      },
      1
    );
  }, [domLoaded]);

  const images = [
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg',
      alt: 'Portrait of Joanna Doe in urban setting',
      name: 'Joanna Doe',
    },
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg',
      alt: 'Portrait of Joan Doe in natural lighting',
      name: 'Joan Doe',
    },
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg',
      alt: 'Portrait of Sarah Chen in studio setting',
      name: 'Sarah Chen',
    },
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg',
      alt: 'Portrait of Joanna Doe in urban setting',
      name: 'Joanna Doe',
    },
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg',
      alt: 'Portrait of Joan Doe in natural lighting',
      name: 'Joan Doe',
    },
    {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg',
      alt: 'Portrait of Sarah Chen in studio setting',
      name: 'Sarah Chen',
    },
  ];

  const css = `
  .mySwiperHero231 {
    width: 100%;
    min-width: 750px;
    height: 100%;
    padding-bottom: 50px;
  } 

  .mySwiperHero231 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    margin-top: 60px;
    height: 420px;
  }
  
  .mySwiperHero231 .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  .swiper-pagination {
    bottom: 10px !important;
    width: 100% !important;
    left: 0% !important;
  }
  .swiper-pagination-bullet {
    background-color: var(--primary);
  }

  @media (min-width: 768px) {
    .swiper-pagination {
      width: fit-content !important;
      left: 80% !important;
    }
  }

  .invisibleOnLoad {
    visibility: hidden;
  }

  `;
  return (
    <section
      id='heroHomepage'
      className='min-h-screen py-16 dark bg-black grid place-items-center '
      style={{ width: '100%', height: '600px', position: 'relative' }}
    >
      <DarkVeil />
      <style>{css}</style>
      <div className='container mt-4 flex flex-col items-center justify-center gap-4 overflow-hidden text-left xl:mt-14 xl:flex-row xl:overflow-visible invisibleOnLoad'>
        <div className='w-full space-y-10 xl:w-1/2'>
          <Button
            variant='secondary'
            className='items-left bg-muted/70 group flex w-fit justify-center gap-3 rounded-full px-5 py-1 hiddenEntry'
          >
            <span className='bg-foreground size-2.5 rounded-full' />
            {text2}
          </Button>
          <h1 className='font-calSans text-foreground mt-12 text-5xl font-medium tracking-tight md:text-7xl z-10 relative'>
            <span className='block hiddenEntry'>{title.line1}</span>
            <span id='animetatedTitle' className='block w-fit'>
              {title.line2}
            </span>
            <span className='block hiddenEntry'>{title.line3}</span>
          </h1>
          <p className='text-muted-foreground/80 mt-3 max-w-lg hiddenEntry'>
            {text1}
          </p>
          <div className='flex gap-4 xl:mt-32'>
            <Button
              variant='secondary'
              className='group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight hiddenEntry'
              onClick={() => scrollToContainer('aboutMeHomepage', 'center')}
            >
              <span>{button1}</span>
              <ArrowRight className='size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0' />
            </Button>
            <Button
              variant='default'
              className='group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight hiddenEntry'
              onClick={() => scrollToContainer('contactMeHomepage', 'center')}
            >
              <span>{button2}</span>
              <ArrowRight className='size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0' />
            </Button>
          </div>
        </div>
        <div className='mt-10 relative w-full xl:mt-0 xl:w-3/5'>
          <div className='mx-auto flex h-full items-center justify-center'>
            {domLoaded && (
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                effect='coverflow'
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={2.438}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                className='mySwiperHero231 hiddenEntry'
                modules={[EffectCoverflow, Autoplay, Pagination]}
                pagination={{ clickable: true }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className='h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg'
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className='z-0 bg-muted/50 xl:h-155 xl:w-9/10 absolute right-0 top-0 h-full w-full rounded-3xl xl:top-1/2 xl:mt-4 xl:-translate-y-1/2 hiddenEntry' />
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;

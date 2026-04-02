'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { H2 } from './ui/h2';
import { P } from './ui/p';
import { H3 } from './ui/h3';
import { IMessage } from '@/types/message';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = IMessage['homepage']['clients'];

const Clients = ({ title, text, items }: Props): React.ReactNode => {
  useGSAP(() => {
    if (!items || !text) return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#clientsHomepage',
        start: 'top 60%',
      },
    });

    tl.from(
      '.clients-animation',
      {
        opacity: 0,
        y: 100,
        ease: 'power3.out',
        stagger: 0.08,
        duration: 0.9,
      },
      0,
    );
  }, [text, items]);

  return (
    <section id='clientsHomepage' className='overflow-hidden py-6 lg:py-12'>
      <div className='container space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <H2>{title}</H2>
          <P className='max-w-md'>{text}</P>
        </div>
        <div className='relative -mr-[max(3rem,calc((100vw-80rem)/2+3rem))]'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: true,
            }}
            className='w-full'
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className='basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] xl:basis-[28%] 2xl:basis-1/4 p-3 lg:p-6 pt-0 clients-animation'
                >
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block h-full'
                  >
                    <Card className='overflow-hidden border-none shadow-lg bg-card pt-0! gap-3 h-fit'>
                      <CardContent className='flex h-full flex-col p-0'>
                        <div className='relative h-72 lg:h-82'>
                          <Image
                            width={410}
                            height={328}
                            src={item.image}
                            alt={item.title}
                            className='absolute inset-0 size-full object-cover object-top'
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='flex flex-col gap-1.5 md:gap-3 items-start'>
                        <H3 className='md:text-lg lg:text-xl'>{item.title}</H3>
                        <P>{item.description}</P>
                      </CardFooter>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex gap-3'>
              <CarouselPrevious className='static size-10 translate-x-0 translate-y-0 bg-card transition-colors hover:text-card hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8 border-t shadow-md' />
              <CarouselNext className='static size-10 translate-x-0 translate-y-0 bg-card transition-colors hover:text-card hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8 border-t shadow-md' />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Clients;

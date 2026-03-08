/* eslint-disable @next/next/no-img-element */
'use client';
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

const testimonials = [
  {
    titulo: 'Refugio Da Pedra SP',
    descricao: 'Pousada',
    image: '/clients/refugio.png',
  },
  {
    titulo: 'Quotation Factory',
    descricao: 'B2B SaaS',
    image: '/clients/qf.png',
  },
  {
    titulo: 'Enhanced Button ',
    descricao: 'A shadcn-button component',
    image: '/clients/button.png',
  },
  {
    titulo: 'Higgx',
    descricao: 'Higgx.app AI',
    image: '/clients/higgx.png',
  },
  {
    titulo: 'Loja do VRF',
    descricao: 'e-commerce de vrf e ar condicionado',
    image: '/clients/vrf.png',
  },
];

const Clients = () => {
  return (
    <section className='overflow-hidden py-6 lg:py-12'>
      <div className='container space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <H2>Alguns Clients</H2>
          <P className='max-w-md'>Veja os projetos de clients e open-sources</P>
        </div>
        <div className='relative -mr-[max(3rem,calc((100vw-80rem)/2+3rem))]'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className='w-full'
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className='basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] xl:basis-[28%] 2xl:basis-1/4 p-6 pt-0'
                >
                  <Card className='overflow-hidden border-none shadow-lg bg-card pt-0! gap-3 h-fit'>
                    <CardContent className='flex h-full flex-col p-0'>
                      <div className='relative h-72 lg:h-82'>
                        <img
                          src={testimonial.image}
                          alt={testimonial.titulo}
                          className='absolute inset-0 size-full object-cover object-top'
                        />
                      </div>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-1.5 md:gap-3 items-start'>
                      <H3 className='md:text-lg lg:text-xl'>
                        {testimonial.titulo}
                      </H3>
                      <P>{testimonial.descricao}</P>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex gap-3'>
              <CarouselPrevious className='static size-10 translate-x-0 translate-y-0 bg-muted transition-colors hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8' />
              <CarouselNext className='static size-10 translate-x-0 translate-y-0 bg-muted transition-colors hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8' />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Clients;

'use client';

import { Github, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import scrowToContainer from '@/utils/scrowToContainer';

interface Props {
  navigationLinks: {
    id: string;
    label: string;
    position?: 'start' | 'center' | 'end' | undefined;
  }[];
}

const Footer = ({ navigationLinks }: Props) => {
  return (
    <footer className='bg-primary text-primary-foreground'>
      <div className='mx-auto p-6 md:p-12 max-w-7xl flex flex-col items-center gap-3'>
        <div>
          {navigationLinks.map((item) => (
            <Button
              onClick={() =>
                scrowToContainer(item.id, item.position || 'center')
              }
              className='text-primary-foreground hover:cursor-pointer'
              variant={'link'}
              key={item.label}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className='flex gap-5'>
          <a
            aria-label='Link para github João Carmassi'
            href='https://github.com/joao-carmassi'
            target='_blank'
            className='rounded-full grid place-items-center h-9 w-9 text-white duration-200 hover:bg-[#181717] hover:scale-110 cursor-pointer hover:text-primary-foreground'
          >
            <Github />
          </a>
          <a
            aria-label='Link para Instagram João Carmassi'
            href='https://www.instagram.com/joao_carmassi/'
            target='_blank'
            className='rounded-full grid place-items-center h-9 w-9 text-white duration-200 hover:bg-[#FF0069] hover:scale-110 cursor-pointer hover:text-primary-foreground'
          >
            <Instagram />
          </a>
          <a
            aria-label='Link para linkedin João Carmassi'
            href='https://www.linkedin.com/in/joao-carmassi/'
            target='_blank'
            className='rounded-full grid place-items-center h-9 w-9 text-white duration-200 hover:bg-[#0a66c2] hover:scale-110 cursor-pointer hover:text-primary-foreground'
          >
            <Linkedin />
          </a>
        </div>
        <p>Copyright © 2025 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

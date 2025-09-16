'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import scrollToContainer from '@/utils/scrowToContainer';
import { useEffect, useState } from 'react';
import { ScrollProgress } from './magicui/scroll-progress';
import { Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';

interface Props {
  navigationLinks: {
    id: string;
    label: string;
    position?: 'start' | 'center' | 'end' | undefined;
  }[];
}

export default function Header({ navigationLinks }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed bg-card transition-all duration-500 delay-200 ease-in-out z-40 ${
        isVisible ? 'top-0' : '-top-16'
      }`}
    >
      <ScrollProgress className='bottom-0 bg-primary' />
      <div className='flex h-16 items-center justify-between gap-4 px-6 md:px-12 max-w-7xl mx-auto'>
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label='Abrir menu'
                className='group text-accent size-8 md:hidden border border-accent'
                variant='ghost'
                size='icon'
              >
                <svg
                  className='pointer-events-none'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 12L20 12'
                    className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-36 p-1 md:hidden'>
              <NavigationMenu className='max-w-none *:w-full'>
                <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Button
                        onClick={() =>
                          scrollToContainer(link.id, link.position || 'center')
                        }
                        size={'sm'}
                        variant={'link'}
                      >
                        {link.label}
                      </Button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <button
              onClick={() => scrollToContainer('heroHomepage', 'start')}
              className='hover:cursor-pointer'
            >
              <img
                className='h-12 rounded-full dark:hidden'
                src='/icons/icon-preto.webp'
                alt='iconi JC'
              />
              <img
                className='h-12 rounded-full hidden dark:block'
                src='/icons/icon-branco.webp'
                alt='iconi JC'
              />
            </button>
            {/* Navigation menu */}
            <NavigationMenu className='max-md:hidden'>
              <NavigationMenuList>
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Button
                      onClick={() =>
                        scrollToContainer(link.id, link.position || 'center')
                      }
                      size={'sm'}
                      variant={'ghost'}
                      className='hover:cursor-pointer'
                    >
                      {link.label}
                    </Button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => scrollToContainer('contactMeHomepage', 'center')}
            className='rounded-none font-bold px-8 py-5.5'
            effect={'ringHover'}
          >
            Contact
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Botão abrir campo pesquisa'
                variant='outline'
                size='icon'
                className='rounded-full border-border shadow-md'
              >
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='p-1.5 flex flex-col w-fit'
              sideOffset={12}
              align='end'
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={6}>
                  <DropdownMenuItem asChild>
                    <Link href={'/en'}>English</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/pt'}>Portugues</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={6}>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

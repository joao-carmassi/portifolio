'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import scrollToContainer from '@/utils/scrowToContainer';
import { useEffect, useState } from 'react';
import { ScrollProgress } from './magicui/scroll-progress';
import { ArrowRight, Check, Globe, Settings } from 'lucide-react';
import { Sun, Moon, Monitor } from 'lucide-react';
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
import { IMessage } from '@/types/message';
import { routing } from '../../i18n/routing';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';
import { Separator } from './ui/separator';

type Props = IMessage['navbar'];

export default function Header({
  links,
  options: { language, theme },
  actions: { contact },
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { setTheme, theme: currentTheme } = useTheme();
  const locales = routing.locales;
  const locale = useLocale();
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight - 64);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed backdrop-blur-xs border-b-white transition-all duration-500 delay-200 ease-in-out z-40 ${
        isVisible ? 'bg-card' : 'dark'
      }`}
    >
      <ScrollProgress className='bottom-0 bg-primary' />
      <div
        className={`flex h-16 items-center justify-between gap-4 px-6 md:px-12 mx-auto ${
          isVisible ? 'max-w-7xl' : 'max-w-388'
        } transition-all duration-500 delay-200`}
      >
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {/* Mobile menu trigger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
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
                    className='origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135'
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='md:hidden py-3'>
              <SheetHeader hidden>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <NavigationMenu className='max-w-none *:w-full items-start'>
                <NavigationMenuList className='flex-col items-start gap-1'>
                  <NavigationMenuItem className='px-3'>
                    <button
                      onClick={() => {
                        scrollToContainer('heroHomepage', 'start');
                        setSheetOpen(false);
                      }}
                      className='hover:cursor-pointer'
                      aria-label='Logo'
                    >
                      <Image
                        className='h-10 rounded-full dark:hidden'
                        src='/icons/icon-preto.png'
                        alt='iconi JC'
                        width={40}
                        height={40}
                      />
                      <Image
                        className='h-10 rounded-full hidden dark:block'
                        src='/icons/icon-branco.png'
                        alt='iconi JC'
                        width={40}
                        height={40}
                      />
                    </button>
                  </NavigationMenuItem>
                  {links.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Button
                        onClick={() => {
                          scrollToContainer(
                            link.id,
                            ['center', 'start', 'end'].includes(
                              link.position as string,
                            )
                              ? (link.position as 'center' | 'start' | 'end')
                              : 'center',
                          );
                          setSheetOpen(false);
                        }}
                        variant={'link'}
                        className='w-full flex justify-start'
                      >
                        {link.label}
                      </Button>
                    </NavigationMenuItem>
                  ))}
                  <Separator />
                  <NavigationMenuItem className='w-full p-3'>
                    <Button
                      onClick={() => {
                        scrollToContainer('contactMeHomepage', 'center');
                        setSheetOpen(false);
                      }}
                      className='rounded-none w-full'
                    >
                      {contact} <ArrowRight />
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <button
              onClick={() => scrollToContainer('heroHomepage', 'start')}
              className='hover:cursor-pointer'
              aria-label='Logo'
            >
              <Image
                className='h-11 rounded-full dark:hidden'
                src='/icons/icon-preto.png'
                alt='iconi JC'
                width={44}
                height={44}
              />
              <Image
                className='h-11 rounded-full hidden dark:block'
                src='/icons/icon-branco.png'
                alt='iconi JC'
                width={44}
                height={44}
              />
            </button>
            {/* Navigation menu */}
            <NavigationMenu className='max-md:hidden'>
              <NavigationMenuList>
                {links.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Button
                      onClick={() =>
                        scrollToContainer(
                          link.id,
                          ['center', 'start', 'end'].includes(
                            link.position as string,
                          )
                            ? (link.position as 'center' | 'start' | 'end')
                            : 'center',
                        )
                      }
                      size={'sm'}
                      variant={'ghost'}
                      className='hover:cursor-pointer dark:text-white'
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
            className='rounded-none'
            size={'lg'}
            effect={'ringHover'}
          >
            {contact}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Botão abrir campo pesquisa'
                variant='outline'
                size='icon'
                className='rounded-full border-border bg-muted hover:border-primary dark:text-card dark:bg-foreground dark:border-foreground dark:hover:bg-primary dark:hover:border-primary dark:hover:text-foreground dark:focus:ring-foreground'
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
                <DropdownMenuSubTrigger>
                  <span className='flex items-center gap-2'>
                    <Globe className='w-4 h-4' />
                    {language}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={6}>
                  {locales.map((item) => (
                    <DropdownMenuItem
                      disabled={locale === item}
                      key={item}
                      asChild
                    >
                      <Link
                        href={pathName}
                        locale={item}
                        className='flex items-center uppercase'
                      >
                        {item}
                        {locale === item && <Check />}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span className='flex items-center gap-2'>
                    <Sun className='w-4 h-4' />
                    {theme?.label}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={6}>
                  <DropdownMenuItem
                    disabled={currentTheme === 'light'}
                    onClick={() => setTheme('light')}
                  >
                    <span className='flex items-center gap-2'>
                      <Sun className='w-4 h-4 opacity-60' />
                      {theme?.options.light}
                      {currentTheme === 'light' && <Check />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={currentTheme === 'dark'}
                    onClick={() => setTheme('dark')}
                  >
                    <span className='flex items-center gap-2'>
                      <Moon className='w-4 h-4 opacity-60' />
                      {theme?.options.dark}
                      {currentTheme === 'dark' && <Check />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={currentTheme === 'system'}
                    onClick={() => setTheme('system')}
                  >
                    <span className='flex items-center gap-2'>
                      <Monitor className='w-4 h-4 opacity-60' />
                      {theme?.options.system}
                      {currentTheme === 'system' && <Check />}
                    </span>
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

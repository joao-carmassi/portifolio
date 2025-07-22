'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import scrowToContainer from '@/utils/scrowToContainer';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='w-full relative'>
      <nav
        id='navBar'
        className={`h-16 border-b w-full fixed z-30 bg-card transition-all duration-500 delay-200 ease-in-out ${
          isVisible ? 'top-0' : '-top-16'
        }`}
      >
        <div className='h-full flex items-center justify-between mx-auto px-6 md:px-12 max-w-7xl'>
          <button
            className='cursor-pointer'
            onClick={() => {
              scrowToContainer('containerHero', 'center');
            }}
          >
            <img
              className='rounded-full w-12 h-12'
              src='./icons/icon-preto.webp'
            />
          </button>

          {/* Desktop Menu */}
          <NavMenu className='hidden md:block' />

          <div className='flex items-center gap-3'>
            <Button
              size={'lg'}
              effect={'ringHover'}
              className='rounded-none font-bold px-8'
              onClick={() => {
                scrowToContainer('containerContact', 'center');
              }}
            >
              Contact
            </Button>

            {/* Mobile Menu */}
            <div className='md:hidden'>
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

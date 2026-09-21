'use client';

import { AnimatedBackground } from '@/prisma/ui/animated-background';

export default function Demo2() {
  return (
    <>
      <AnimatedBackground
        defaultValue='tab-1'
        className='rounded-full bg-background'
      >
        <div
          data-id='tab-1'
          className='cursor-pointer rounded-full px-5 py-2 text-sm font-medium'
        >
          Home
        </div>
        <div
          data-id='tab-2'
          className='cursor-pointer rounded-full px-5 py-2 text-sm font-medium'
        >
          About
        </div>
        <div
          data-id='tab-3'
          className='cursor-pointer rounded-full px-5 py-2 text-sm font-medium'
        >
          Services
        </div>
        <div
          data-id='tab-4'
          className='cursor-pointer rounded-full px-5 py-2 text-sm font-medium'
        >
          Contact
        </div>
      </AnimatedBackground>
    </>
  );
}

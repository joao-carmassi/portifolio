'use client';

import { AnimatedBackground } from '@/prisma/ui/animated-background';

export default function Demo1() {
  return (
    <>
      <div className='grid grid-cols-3 gap-4 w-full max-w-lg'>
        <AnimatedBackground className='rounded-lg bg-background/80' enableHover>
          <div
            data-id='react'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold text-sky-500'>⚛</span>
            <span className='text-xs font-medium'>React</span>
          </div>
          <div
            data-id='nextjs'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold'>▲</span>
            <span className='text-xs font-medium'>Next.js</span>
          </div>
          <div
            data-id='typescript'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold text-blue-500'>TS</span>
            <span className='text-xs font-medium'>TypeScript</span>
          </div>
          <div
            data-id='tailwind'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold text-cyan-500'>🌊</span>
            <span className='text-xs font-medium'>Tailwind</span>
          </div>
          <div
            data-id='prisma'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold text-indigo-500'>◆</span>
            <span className='text-xs font-medium'>Prisma</span>
          </div>
          <div
            data-id='vercel'
            className='flex cursor-pointer flex-col items-center justify-center gap-2 p-6'
          >
            <span className='text-xl font-bold'>▼</span>
            <span className='text-xs font-medium'>Vercel</span>
          </div>
        </AnimatedBackground>
      </div>
    </>
  );
}

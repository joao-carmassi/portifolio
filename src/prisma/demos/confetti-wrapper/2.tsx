'use client';

import { ConfettiWrapper } from '@/prisma/ui/confetti-wrapper';
import { Button } from '@/prisma/ui/button';
import { ConfettiOnClickDemo } from '@/prisma/demos/confetti-onclick';

export default function Demo2() {
  return (
    <>
      <ConfettiWrapper angle={60}>
        <Button variant='outline'>60°</Button>
      </ConfettiWrapper>
      <ConfettiWrapper angle={90}>
        <Button variant='outline'>90° (default)</Button>
      </ConfettiWrapper>
      <ConfettiWrapper angle={120}>
        <Button variant='outline'>120°</Button>
      </ConfettiWrapper>
    </>
  );
}

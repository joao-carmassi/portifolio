'use client';

import { ConfettiWrapper } from '@/prisma/ui/confetti-wrapper';
import { Button } from '@/prisma/ui/button';
import { ConfettiOnClickDemo } from '@/prisma/demos/confetti-onclick';

export default function Demo4() {
  return (
    <>
      <ConfettiWrapper>
        <Button variant='default'>Default</Button>
      </ConfettiWrapper>
      <ConfettiWrapper>
        <Button variant='destructive'>Destructive</Button>
      </ConfettiWrapper>
      <ConfettiWrapper>
        <Button variant='outline'>Outline</Button>
      </ConfettiWrapper>
      <ConfettiWrapper>
        <Button variant='secondary'>Secondary</Button>
      </ConfettiWrapper>
      <ConfettiWrapper>
        <Button variant='ghost'>Ghost</Button>
      </ConfettiWrapper>
    </>
  );
}

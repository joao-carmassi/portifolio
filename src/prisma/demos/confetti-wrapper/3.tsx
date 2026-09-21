'use client';

import { ConfettiWrapper } from '@/prisma/ui/confetti-wrapper';
import { Button } from '@/prisma/ui/button';
import { ConfettiOnClickDemo } from '@/prisma/demos/confetti-onclick';

export default function Demo3() {
  return (
    <>
      <ConfettiWrapper count={20}>
        <Button variant='secondary'>Light (20)</Button>
      </ConfettiWrapper>
      <ConfettiWrapper count={80}>
        <Button variant='secondary'>Default (80)</Button>
      </ConfettiWrapper>
      <ConfettiWrapper count={200}>
        <Button variant='secondary'>Explosion (200)</Button>
      </ConfettiWrapper>
    </>
  );
}

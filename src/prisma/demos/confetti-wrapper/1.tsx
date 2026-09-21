'use client';

import { ConfettiWrapper } from '@/prisma/ui/confetti-wrapper';
import { Button } from '@/prisma/ui/button';
import { ConfettiOnClickDemo } from '@/prisma/demos/confetti-onclick';

export default function Demo1() {
  return (
    <>
      <ConfettiWrapper>
        <Button>Click me!</Button>
      </ConfettiWrapper>
    </>
  );
}

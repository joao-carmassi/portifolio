'use client';

import { ConfettiWrapper } from '@/prisma/ui/confetti-wrapper';
import { Button } from '@/prisma/ui/button';

export const ConfettiOnClickDemo = (): React.ReactNode => {
  return (
    <ConfettiWrapper>
      <Button onClick={() => alert('Clicked!')}>With onClick</Button>
    </ConfettiWrapper>
  );
};

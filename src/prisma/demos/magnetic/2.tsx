'use client';

import { Magnetic } from '@/prisma/ui/magnetic';
import { Button } from '@/prisma/ui/button';

export default function Demo2() {
  return (
    <>
      <Magnetic intensity={0.8} range={200}>
        <Button variant='outline'>Stronger pull</Button>
      </Magnetic>
    </>
  );
}

'use client';

import { Magnetic } from '@/prisma/ui/magnetic';
import { Button } from '@/prisma/ui/button';

export default function Demo1() {
  return (
    <>
      <Magnetic>
        <Button>Hover me</Button>
      </Magnetic>
    </>
  );
}

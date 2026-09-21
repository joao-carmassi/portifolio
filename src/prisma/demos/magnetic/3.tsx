'use client';

import { Magnetic } from '@/prisma/ui/magnetic';
import { Button } from '@/prisma/ui/button';

export default function Demo3() {
  return (
    <>
      <Magnetic actionArea='self'>
        <Button variant='outline'>Self</Button>
      </Magnetic>
      <Magnetic actionArea='parent'>
        <Button variant='outline'>Parent</Button>
      </Magnetic>
    </>
  );
}

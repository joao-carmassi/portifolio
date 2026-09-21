'use client';

import { AuraEffect } from '@/prisma/ui/aura-beam';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/prisma/ui/card';
import { Button } from '@/prisma/ui/button';

export default function Demo6() {
  return (
    <>
      <AuraEffect variant='glow' className='w-[340px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Glow</CardTitle>
            <CardDescription>Move your cursor near the edges.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {'Use '}
              <code>{'variant="glow"'}</code>
              {' for a cursor-following border light.'}
            </p>
          </CardContent>
          <CardFooter>
            <Button size='sm'>Action</Button>
          </CardFooter>
        </Card>
      </AuraEffect>
    </>
  );
}

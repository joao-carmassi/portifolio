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

export default function Demo2() {
  return (
    <>
      <AuraEffect variant='beam' className='w-[340px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Beam</CardTitle>
            <CardDescription>
              A focused arc of light travels along the border.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {'Use '}
              <code>{'variant="beam"'}</code>
              {' for a sharp travelling arc.'}
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

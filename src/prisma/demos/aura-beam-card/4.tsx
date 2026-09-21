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

export default function Demo4() {
  return (
    <>
      <AuraEffect variant='shine' className='w-[340px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Shine</CardTitle>
            <CardDescription>
              A radial highlight sweeps continuously across the border.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {'Use '}
              <code>{'variant="shine"'}</code>
              {' for a sweeping glow.'}
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

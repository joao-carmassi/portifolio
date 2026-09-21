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

export default function Demo1() {
  return (
    <>
      <AuraEffect className='w-[340px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Aura Beam</CardTitle>
            <CardDescription>
              Ambient glow wrapping the card from outside.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {'Wrap any Card with '}
              <code>{'<AuraEffect>'}</code>
              {' to apply the effect.'}
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

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

export default function Demo7() {
  return (
    <>
      <AuraEffect
        variant='glow'
        color={['#c084fc', '#f472b6', '#38bdf8']}
        className='w-[300px]'
      >
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Prism</CardTitle>
            <CardDescription>purple → pink → sky</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect
        variant='glow'
        color={['#f59e0b', '#ef4444', '#f97316']}
        className='w-[300px]'
      >
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Warm tones</CardTitle>
            <CardDescription>amber → red → orange</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

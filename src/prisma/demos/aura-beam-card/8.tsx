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

export default function Demo8() {
  return (
    <>
      <AuraEffect variant='glow' edgeSensitivity={10} className='w-[280px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Tight (10 px)</CardTitle>
            <CardDescription>Glow only on the edge itself</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect
        variant='glow'
        edgeSensitivity={180}
        coneSpread={220}
        className='w-[280px]'
      >
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Wide (180 px)</CardTitle>
            <CardDescription>Broad, soft spread</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

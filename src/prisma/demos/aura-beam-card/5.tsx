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

export default function Demo5() {
  return (
    <>
      <AuraEffect
        variant='shine'
        color={['#ffaa40', '#9c40ff', '#00d2ff']}
        className='w-[300px]'
      >
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Multi-color</CardTitle>
            <CardDescription>Three-color radial gradient sweep.</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect
        variant='shine'
        color={['#f7971e', '#ffd200']}
        className='w-[300px]'
      >
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Gold Shine</CardTitle>
            <CardDescription>Warm gold sweep.</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

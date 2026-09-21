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

export default function Demo3() {
  return (
    <>
      <AuraEffect variant='beam' color={['#ffaa40', '#9c40ff']} className='w-[300px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Orange → Purple</CardTitle>
            <CardDescription>Gradient beam with two colors.</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect variant='beam' color={['#00c6ff', '#0072ff']} className='w-[300px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Blue Beam</CardTitle>
            <CardDescription>Cool blue gradient beam.</CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

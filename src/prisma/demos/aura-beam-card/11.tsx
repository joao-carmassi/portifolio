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

export default function Demo11() {
  return (
    <>
      <AuraEffect variant='beam' borderWidth={3} className='w-[300px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Thick Beam</CardTitle>
            <CardDescription>
              <code>borderWidth={3}</code>
            </CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect variant='shine' borderWidth={3} className='w-[300px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Thick Shine</CardTitle>
            <CardDescription>
              <code>borderWidth={3}</code>
            </CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

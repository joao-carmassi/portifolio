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

export default function Demo10() {
  return (
    <>
      <AuraEffect variant='beam' duration={3} className='w-[280px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Fast Beam</CardTitle>
            <CardDescription>
              <code>duration={3}</code>
            </CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
      <AuraEffect variant='shine' duration={20} className='w-[280px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Slow Shine</CardTitle>
            <CardDescription>
              <code>duration={20}</code>
            </CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

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

export default function Demo9() {
  return (
    <>
      <AuraEffect variant='glow' animated duration={2} className='w-[340px]'>
        <Card className='rounded-[inherit]'>
          <CardHeader>
            <CardTitle>Animated Intro</CardTitle>
            <CardDescription>
              The glow sweeps once around the border on mount.
            </CardDescription>
          </CardHeader>
        </Card>
      </AuraEffect>
    </>
  );
}

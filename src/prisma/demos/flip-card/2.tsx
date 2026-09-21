'use client';

import { FlipCard } from '@/prisma/ui/flip-card';
import { FlipCardControlledDemo } from '@/prisma/demos/flip-card-controlled';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/prisma/ui/card';
import { Button } from '@/prisma/ui/button';
import { Badge } from '@/prisma/ui/badge';

export default function Demo2() {
  return (
    <>
      <FlipCard
        className='h-75 w-75'
        front={
          <Card className='h-full'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Pricing</CardTitle>
                <Badge>Pro</Badge>
              </div>
              <CardDescription>Hover to see what's included.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold'>
                $29
                <span className='text-sm font-normal text-muted-foreground'>
                  /mo
                </span>
              </p>
            </CardContent>
          </Card>
        }
        back={
          <Card className='h-full flex flex-col'>
            <CardHeader>
              <CardTitle>What's included</CardTitle>
            </CardHeader>
            <CardContent className='flex-1'>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Custom domain</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full' size='sm'>
                Get started
              </Button>
            </CardFooter>
          </Card>
        }
      />
    </>
  );
}

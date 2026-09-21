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

export default function Demo1() {
  return (
    <>
      <FlipCard
        className='h-70 w-75'
        front={
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Front Face</CardTitle>
              <CardDescription>Hover to reveal the back.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                This is the front side of the card.
              </p>
            </CardContent>
          </Card>
        }
        back={
          <Card className='h-full bg-primary text-primary-foreground'>
            <CardHeader>
              <CardTitle>Back Face</CardTitle>
              <CardDescription className='text-primary-foreground/70'>
                Content revealed on hover.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-primary-foreground/70'>
                The back face can have a completely different style.
              </p>
            </CardContent>
          </Card>
        }
      />
    </>
  );
}

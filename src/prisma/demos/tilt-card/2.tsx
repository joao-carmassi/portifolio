'use client';

import { Tilt } from '@/prisma/ui/tilt';
import { DepthMedia } from '@/prisma/ui/depth-media';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/prisma/ui/card';

export default function Demo2() {
  return (
    <>
      <Tilt isReverse rotationFactor={20}>
        <Card className='w-72'>
          <CardHeader>
            <CardTitle>Reversed</CardTitle>
            <CardDescription>Tilt moves opposite to cursor.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className='block text-sm text-muted-foreground'>
              {'Use isReverse to invert the tilt direction.'}
            </span>
          </CardContent>
        </Card>
      </Tilt>
    </>
  );
}

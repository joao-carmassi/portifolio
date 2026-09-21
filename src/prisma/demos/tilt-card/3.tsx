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

export default function Demo3() {
  return (
    <>
      <Tilt rotationFactor={15} springOptions={{ stiffness: 300, damping: 20 }}>
        <Card className='w-72 overflow-hidden'>
          <div className='relative h-48'>
            <DepthMedia
              src='https://picsum.photos/288/192'
              alt='Mountain landscape'
            />
          </div>
          <CardHeader>
            <CardTitle>Depth Media</CardTitle>
            <CardDescription>Hover to feel the parallax depth.</CardDescription>
          </CardHeader>
        </Card>
      </Tilt>
    </>
  );
}

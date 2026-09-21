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

export default function Demo4() {
  return (
    <>
      <Tilt rotationFactor={15} springOptions={{ stiffness: 300, damping: 20 }}>
        <Card className='w-60 overflow-hidden'>
          <div className='relative h-40'>
            <DepthMedia
              src='https://picsum.photos/240/160'
              alt='Low intensity'
              depthIntensity={4}
            />
          </div>
          <CardContent className='py-3'>
            <p className='text-xs text-muted-foreground'>{'depthIntensity={4}'}</p>
          </CardContent>
        </Card>
      </Tilt>
      <Tilt rotationFactor={15} springOptions={{ stiffness: 300, damping: 20 }}>
        <Card className='w-60 overflow-hidden'>
          <div className='relative h-40'>
            <DepthMedia
              src='https://picsum.photos/242/162'
              alt='High intensity'
              depthIntensity={16}
            />
          </div>
          <CardContent className='py-3'>
            <p className='text-xs text-muted-foreground'>{'depthIntensity={16}'}</p>
          </CardContent>
        </Card>
      </Tilt>
    </>
  );
}

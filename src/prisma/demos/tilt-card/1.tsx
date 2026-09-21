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

export default function Demo1() {
  return (
    <>
      <Tilt rotationFactor={15} springOptions={{ stiffness: 300, damping: 20 }}>
        <Card className='w-72'>
          <CardHeader>
            <CardTitle>Tilt Card</CardTitle>
            <CardDescription>Hover to see the 3D tilt effect.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className='block text-sm text-muted-foreground'>
              {'Wrap any element with the Tilt component for interactive depth.'}
            </span>
          </CardContent>
        </Card>
      </Tilt>
    </>
  );
}

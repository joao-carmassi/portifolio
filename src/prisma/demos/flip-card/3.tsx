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

export default function Demo3() {
  return (
    <>
      <FlipCardControlledDemo />
    </>
  );
}

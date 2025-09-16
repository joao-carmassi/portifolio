'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';
import { ClassNameValue } from 'tailwind-merge';

interface Props {
  className: ClassNameValue;
  src?: string;
  alt?: string;
}

export const ParalaxImg = ({ className, src, alt }: Props) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });

  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ['50% 30%', '50% 0%']
  );

  return (
    <motion.img
      ref={ref}
      className={className as string}
      style={{ objectPosition }}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`}
      alt={alt}
    />
  );
};

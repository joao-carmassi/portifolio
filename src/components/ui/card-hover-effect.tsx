'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { P } from './p';
import { H3 } from './h3';

export const HoverEffect = ({
  items,
  className,
}: {
  items: { name: string; img: React.ReactNode }[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative grid grid-cols-4 md:grid-cols-6 divide-x divide-y',
        className
      )}
    >
      <AnimatePresence>
        {hoveredIndex !== null && hoverRect && containerRef.current && (
          <motion.span
            layoutId='hoverBackground'
            className='absolute bg-foreground'
            style={{
              top:
                hoverRect.top -
                containerRef.current.getBoundingClientRect().top,
              left:
                hoverRect.left -
                containerRef.current.getBoundingClientRect().left,
              width: hoverRect.width,
              height: hoverRect.height,
            }}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'relative group block h-full w-full border-foreground/25 col-span-2',
            i <= 1 && 'md:col-span-3',
            (i + 1) % 2 === 0 && 'border-r-0',
            items.length - 2 === i && 'border-b-0',
            i === 3 && 'md:border-r',
            i === 5 && 'md:border-r',
            i === 4 && 'md:border-r-0',
            i === 5 && 'md:border-b-0'
          )}
          onMouseEnter={(e) => {
            setHoveredIndex(i);

            const card = e.currentTarget.querySelector(
              '.card-inner'
            ) as HTMLElement;
            if (card) {
              const rect = card.getBoundingClientRect();
              setHoverRect(rect);
            }
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setHoverRect(null);
          }}
        >
          <Card className='relative'>
            <div className='absolute top-3 left-3 hidden md:block'>
              <H3 className='group-hover:text-background duration-200'>
                {item.name}
              </H3>
            </div>
            <CardDescription>{item.img}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'card-inner h-full w-full relative z-20 py-12 md:py-20',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <P
      className={cn(
        'text-foreground group-hover:text-background duration-200 text-center !text-xl md:!text-3xl !font-semibold',
        className
      )}
    >
      {children}
    </P>
  );
};

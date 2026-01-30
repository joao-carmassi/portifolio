import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <p className={cn('scroll-m-20 md:text-lg text-foreground', className)}>
      {children}
    </p>
  );
}

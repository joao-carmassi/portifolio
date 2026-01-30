import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 md:text-3xl lg:text-4xl font-extrabold tracking-wide',
        className,
      )}
    >
      {children}
    </h1>
  );
}

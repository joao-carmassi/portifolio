import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h3
      className={cn(
        `scroll-m-20 text-lg md:text-xl lg:text-2xl font-semibold tracking-wide`,
        className,
      )}
    >
      {children}
    </h3>
  );
}

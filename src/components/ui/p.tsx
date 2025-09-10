import { ClassValue } from 'clsx';

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <p className={`scroll-m-20 md:text-lg text-foreground ${className}`}>
      {children}
    </p>
  );
}

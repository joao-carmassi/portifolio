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
      className={`scroll-m-20 text-2xl font-semibold tracking-tight text-primary ${className}`}
    >
      {children}
    </h3>
  );
}

import { ClassValue } from 'clsx';

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h2
      className={`scroll-m-20 text-3xl md:text-4xl font-semibold tracking-tight first:mt-0 text-primary ${className}`}
    >
      {children}
    </h2>
  );
}

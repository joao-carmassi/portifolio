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
      className={`scroll-m-20 text-primary text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide ${className}`}
    >
      {children}
    </h2>
  );
}

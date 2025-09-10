import { ClassValue } from 'clsx';

export function Ol({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <ol className={`ml-6 list-decimal [&>li]:mt-2 ${className}`}>{children}</ol>
  );
}

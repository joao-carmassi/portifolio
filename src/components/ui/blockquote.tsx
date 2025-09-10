import { ClassValue } from 'clsx';

export function Blockquote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <blockquote className={`border-l-2 border-border pl-6 italic ${className}`}>
      {children}
    </blockquote>
  );
}

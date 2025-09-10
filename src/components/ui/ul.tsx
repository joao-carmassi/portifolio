import { ClassValue } from 'clsx';

export function Ul({ children, className }: { children: React.ReactNode; className?: ClassValue }) {
  return <ul className={`ml-6 list-disc [&>li]:mt-2 ${className}`}>{children}</ul>;
}
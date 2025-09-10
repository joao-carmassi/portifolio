import { ClassValue } from 'clsx';

export function A({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: ClassValue;
  href: string;
}) {
  return (
    <a
      target='_blank'
      href={href}
      className={`scroll-m-20 md:text-lg text-primary hover:underline ${className}`}
    >
      {children}
    </a>
  );
}

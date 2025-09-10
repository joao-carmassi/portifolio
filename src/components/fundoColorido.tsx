'use client';

import adicionaFundoColorido from '@/utils/fundoColorido';
import { ReactNode, HTMLAttributes, useEffect } from 'react';

interface FundoColoridoProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

const FundoColorido: React.FC<FundoColoridoProps> = ({
  children,
  className,
  ...props
}) => {
  useEffect(() => {
    adicionaFundoColorido();
  }, []);

  return (
    <section
      {...props}
      className={`header finisher-header relative ${className}`}
    >
      {children}
    </section>
  );
};

export default FundoColorido;

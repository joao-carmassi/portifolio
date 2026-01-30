/* eslint-disable @next/next/no-img-element */
import { ClassNameValue } from 'tailwind-merge';

interface Props {
  className: ClassNameValue;
  src?: string;
  alt?: string;
}

const Img = ({ className, src, alt }: Props) => {
  return (
    <img
      className={className as string}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`}
      alt={alt}
    />
  );
};

export default Img;

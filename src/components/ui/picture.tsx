import type { OptimizedImage } from '@/lib/images';

type Props = Omit<
  React.ComponentProps<'img'>,
  'src' | 'srcSet' | 'width' | 'height'
> & {
  /** built by picture()/pictures() in the page, see src/lib/images.ts */
  image: OptimizedImage;
  alt: string;
  /** on the <picture> itself; `className` stays on the <img> */
  wrapperClassName?: string;
};

/**
 * Renders an image astro:assets already optimised. The island never touches the
 * build pipeline, it just gets the sources it needs.
 */
export function Picture({
  image,
  alt,
  sizes,
  wrapperClassName,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: Props): React.ReactNode {
  return (
    <picture className={wrapperClassName}>
      {image.sources.map(({ type, srcSet }) => (
        <source key={type} type={type} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...imgProps}
      />
    </picture>
  );
}

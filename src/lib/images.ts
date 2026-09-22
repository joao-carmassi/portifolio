import { getImage } from 'astro:assets';

/*
 * astro:assets only runs on the server, so an island can never import it. The
 * page optimises up front and hands the island plain data, which is what
 * <Picture> in components/ui/picture.tsx renders.
 *
 * Every bitmap under src/assets is picked up here, keyed the way the locale
 * json already writes it: src/assets/clients/qf.webp -> /clients/qf.webp. That
 * keeps the json the single source of truth and saves one import line per image.
 */
const assets = import.meta.glob<ImageMetadata>(
  '/src/assets/**/*.{avif,jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
);

const byKey: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(assets).map(([path, image]) => [
    path.replace('/src/assets', ''),
    image,
  ]),
);

export type Format = 'avif' | 'webp' | 'png' | 'jpg' | 'jpeg';

/** One image, already optimised, in the shape an island can be given as props. */
export type OptimizedImage = {
  /** one per format ahead of the fallback; empty when there is only one format */
  sources: { type: string; srcSet: string }[];
  /** the last format, which is also the <img> every browser ends up using */
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

type Options = {
  /** rendered widths to emit; anything wider than the file itself is dropped */
  widths: number[];
  /**
   * Last one is the <img> fallback, the ones before it become <source>s.
   * avif first, webp for browsers without it.
   */
  formats?: [Format, ...Format[]];
  /** one value for every format; leave it out to get DEFAULT_QUALITY per format */
  quality?: number;
};

/*
 * The scales don't line up: avif at 82 is near-lossless and came out 15-35%
 * larger than webp at 82 on these screenshots. At 70 it weighs about what webp
 * 82 does (60 was 25% lighter) and looks sharper.
 */
const DEFAULT_QUALITY: Partial<Record<Format, number>> = { avif: 70, webp: 82 };

/**
 * `sizes` is deliberately not here: widths are a build-time decision, sizes a
 * layout one, so it is passed to <Picture> at each use site instead. That lets
 * the same optimised image serve a card and a dialog without being built twice.
 */
export const picture = async (
  key: string,
  { widths, formats = ['avif', 'webp'], quality }: Options,
): Promise<OptimizedImage> => {
  const src = byKey[key];
  if (!src) {
    throw new Error(
      `[images] no asset for "${key}" — expected a file at src/assets${key}`,
    );
  }

  // never upscale, but always keep at least one width
  const capped = widths.filter((w) => w <= src.width);
  const useWidths = capped.length ? capped : [Math.min(...widths, src.width)];
  const width = Math.max(...useWidths);

  const built = await Promise.all(
    formats.map(async (format) => {
      const image = await getImage({
        src,
        width,
        widths: useWidths,
        format,
        quality: quality ?? DEFAULT_QUALITY[format] ?? 82,
      });
      return {
        type: `image/${format}`,
        src: image.src,
        srcSet: image.srcSet.attribute,
        width: Number(image.attributes.width),
        height: Number(image.attributes.height),
      };
    }),
  );

  const fallback = built.at(-1)!;

  return {
    // the fallback is the <img>, so it never needs a <source> of its own
    sources: built.slice(0, -1).map(({ type, srcSet }) => ({ type, srcSet })),
    src: fallback.src,
    srcSet: fallback.srcSet,
    width: fallback.width,
    height: fallback.height,
  };
};

/** Same thing for a list of keys, keyed by the key, so islands can look up by json value. */
export const pictures = async (
  keys: string[],
  options: Options,
): Promise<Record<string, OptimizedImage>> =>
  Object.fromEntries(
    await Promise.all(
      [...new Set(keys)].map(
        async (key) => [key, await picture(key, options)] as const,
      ),
    ),
  );

/**
 * One fixed-width render, for the places a srcset cannot help: a Remotion
 * composition always lays out at its own pixel size (1920 here) and is then
 * scaled by CSS, so the browser would pick the widest candidate every time.
 */
export const srcAt = async (
  key: string,
  width: number,
  format: Format = 'webp',
): Promise<string> =>
  (await picture(key, { widths: [width], formats: [format] })).src;

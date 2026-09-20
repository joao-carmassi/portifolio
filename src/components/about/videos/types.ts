import type { ComponentType } from 'react';
import type { AboutCopy } from '@/i18n';

export const FPS = 30;

/**
 * Optimised image urls the page builds, keyed by the same src/assets path the
 * composition asks for. astro:assets is server-only, so a composition can never
 * reach for it itself — the urls come in as Player inputProps.
 */
export type VideoImages = Record<string, string>;

export type VideoProps = { images: VideoImages };

export interface AboutVideo {
  /** the key under `about.videos` holding this video's caption in each language */
  id: keyof AboutCopy['videos'];
  /** a composition without images is free to ignore the prop */
  component: ComponentType<VideoProps>;
  width: number;
  height: number;
  durationInFrames: number;
}

import type { ComponentType } from 'react';
import type { AboutCopy } from '@/i18n';

export const FPS = 30;

/**
 * Optimised image urls the page builds, keyed by the same src/assets path the
 * composition asks for. astro:assets is server-only, so a composition can never
 * reach for it itself — the urls come in as Player inputProps.
 */
export type VideoImages = Record<string, string>;

export type VideoId = keyof AboutCopy['videos'];

/**
 * Every word on screen comes from the locale file, so each language renders its
 * own cut of the video rather than a Portuguese one with a translated caption.
 */
export type VideoScript<Id extends VideoId> = AboutCopy['videos'][Id]['script'];

export type VideoProps<Id extends VideoId> = {
  /** a composition without images is free to ignore the prop */
  images: VideoImages;
  script: VideoScript<Id>;
};

export interface AboutVideo<Id extends VideoId = VideoId> {
  /** the key under `about.videos` holding this video's copy in each language */
  id: Id;
  component: ComponentType<VideoProps<Id>>;
  width: number;
  height: number;
  /**
   * A function, not a number: scenes driven by WordStream are as long as their
   * text, and the text is per language.
   */
  durationInFrames: (script: VideoScript<Id>) => number;
}

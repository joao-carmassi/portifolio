import type { ComponentType } from 'react';
import type { AboutCopy } from '@/i18n';

export const FPS = 30;

export interface AboutVideo {
  /** the key under `about.videos` holding this video's caption in each language */
  id: keyof AboutCopy['videos'];
  component: ComponentType;
  width: number;
  height: number;
  durationInFrames: number;
}

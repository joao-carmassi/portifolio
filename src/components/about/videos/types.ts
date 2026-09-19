import type { ComponentType } from 'react';

export const FPS = 30;

export interface AboutVideo {
  id: string;
  title: string;
  component: ComponentType;
  width: number;
  height: number;
  durationInFrames: number;
  /** pt-BR summary for screen readers */
  srText: string;
}

import type { MediaType } from './media';

export type SliderItem = {
  id: number;
  type: MediaType;
  src: string;
  duration: number;
};

import { MediaType } from '@/types/media';
import type { SliderItem } from '@/types/slider';

export const sliderItems: SliderItem[] = [
  {
    id: 1,
    type: MediaType.IMAGE,
    src: 'https://picsum.photos/id/10/800/600',
    duration: 5,
  },
  {
    id: 2,
    type: MediaType.VIDEO,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 10000,
  },
  {
    id: 3,
    type: MediaType.IMAGE,
    src: 'https://picsum.photos/id/11/800/600',
    duration: 4,
  },
  {
    id: 4,
    type: MediaType.IMAGE,
    src: 'https://picsum.photos/id/12/800/600',
    duration: 4,
  },
];

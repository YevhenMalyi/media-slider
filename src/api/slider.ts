import { sliderItems } from '@/data/sliderItems';
import { mockedRequest } from '@/utils/mockedRequest';
import type { SliderItem } from '@/types/slider';

export const getSliderItems = async (): Promise<SliderItem[]> => {
  return mockedRequest(sliderItems);
};

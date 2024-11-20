import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { getSliderItems } from '@/api/slider';
import { useRequest } from '@/composables/useRequest';

export const useSliderStore = defineStore('slider', () => {
  const {
    isLoading,
    isError,
    message,
    data: items,
    sendRequest: fetchSliderItems,
  } = useRequest(getSliderItems);

  const currentItemIndex = ref(0);
  const amount = computed(() => items?.value?.length ?? 0);

  const prevItem = () => {
    currentItemIndex.value =
      currentItemIndex.value - 1 >= 0
        ? currentItemIndex.value - 1
        : amount.value - 1;
  };

  const nextItem = () => {
    currentItemIndex.value =
      currentItemIndex.value + 1 < amount.value
        ? currentItemIndex.value + 1
        : 0;
  };

  const setCurrentItemIndex = (index: number) => {
    currentItemIndex.value = index;
  };

  const reloadSlider = async () => {
    currentItemIndex.value = 0;
    await fetchSliderItems();
  };

  return {
    isLoading,
    isError,
    currentItemIndex,
    items,
    message,

    fetchSliderItems,
    prevItem,
    nextItem,
    reloadSlider,
    setCurrentItemIndex,
  };
});

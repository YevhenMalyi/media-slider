import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSliderStore = defineStore('slider', () => {
  const isLoading = ref(false);
  const isError = ref(false);
  const currentItemIndex = ref(0);
  const message = ref('');
  const items = ref([]);

  const fetchSliderItems = async () => {
    try {
      isLoading.value = true;
      isError.value = false;
      // TODO: fetch slider items request
    } catch (error: unknown) {
      isError.value = true;
      message.value = error instanceof Error ? error.message : String(error);
    } finally {
      isLoading.value = false;
    }
  };

  const nextItem = () => {
    currentItemIndex.value =
      currentItemIndex.value + 1 < items.value.length
        ? currentItemIndex.value + 1
        : 0;
  };

  const reloadSlider = () => {
    currentItemIndex.value = 0;
    fetchSliderItems();
  };

  return {
    isLoading,
    isError,
    currentItemIndex,
    items,
    message,

    fetchSliderItems,
    nextItem,
    reloadSlider,
  };
});

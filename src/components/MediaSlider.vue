<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useSliderStore } from '@/stores/slider';
import MediaSliderItem from './MediaSliderItem.vue';

const sliderStore = useSliderStore();
let timeout: NodeJS.Timeout | null = null;

const { isLoading, isError, items, message, currentItemIndex } =
  storeToRefs(sliderStore);

const currentItem = computed(
  () => items.value?.[currentItemIndex.value] ?? null,
);

watchEffect(() => {
  if (timeout) {
    clearTimeout(timeout);
  }

  const duration = currentItem.value?.duration;
  if (duration) {
    timeout = setTimeout(() => {
      sliderStore.nextItem();
    }, duration * 1000);
  }
});

onMounted(async () => {
  await sliderStore.fetchSliderItems();
});

onUnmounted(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
});
</script>

<template>
  <div class="slider">
    <div v-if="isLoading || items === null">Loading...</div>

    <div v-else-if="isError">Error: {{ message }}</div>

    <Transition name="slide" v-else>
      <MediaSliderItem :key="currentItem?.id" v-bind="currentItem" />
    </Transition>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 800px;
  position: relative;
  overflow: hidden;
}

.slider > div {
  min-width: 100%;
  min-height: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

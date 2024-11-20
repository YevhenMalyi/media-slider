<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useSliderStore } from '@/stores/slider';
import MediaSliderItem from './MediaSliderItem.vue';
import MediaSliderNav from './MediaSliderNav.vue';
import spinnerSVG from '@/assets/spinner.svg';

let timeout: ReturnType<typeof setTimeout> | null = null;

const sliderStore = useSliderStore();
const { isLoading, isError, items, message, currentItemIndex } =
  storeToRefs(sliderStore);
const currentItem = computed(
  () => items.value?.[currentItemIndex.value] ?? null,
);

const isReverse = ref(false);

const resetTimer = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
};

const handleChangeItem = (index: number) => {
  resetTimer();
  if (index < currentItemIndex.value) {
    isReverse.value = true;
  } else {
    isReverse.value = false;
  }
  sliderStore.setCurrentItemIndex(index);
};

const handlePrev = () => {
  resetTimer();
  isReverse.value = true;
  sliderStore.prevItem();
};

const handleNext = () => {
  resetTimer();
  isReverse.value = false;
  sliderStore.nextItem();
};

watchEffect(() => {
  if (timeout) {
    clearTimeout(timeout);
  }

  const duration = currentItem.value?.duration;
  if (duration) {
    timeout = setTimeout(() => {
      isReverse.value = false;
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
    <div v-if="isLoading || items === null" class="loading">
      <img :src="spinnerSVG" alt="Loading..." />
    </div>

    <div v-else-if="isError" class="error">Error: {{ message }}</div>

    <Transition :name="isReverse ? 'slide-reverse' : 'slide'" v-else>
      <MediaSliderItem :key="currentItem?.id" v-bind="currentItem" />
    </Transition>
  </div>

  <div class="navigation">
    <MediaSliderNav
      v-show="Boolean(items)"
      :current-item-index="currentItemIndex"
      :items-count="items?.length ?? 0"
      @on-change-item="handleChangeItem"
      @on-prev="handlePrev"
      @on-next="handleNext"
    />
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
  border: 1px solid #ffffffdf;
}

.error {
  color: #a22626;
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

.slide-reverse-enter-active,
.slide-reverse-leave-active {
  transition: all 1s ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-reverse-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-reverse-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-reverse-enter-to,
.slide-reverse-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.navigation {
  height: 20px;
}
</style>

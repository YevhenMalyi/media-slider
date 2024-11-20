<script lang="ts" setup>
import { MediaType } from '@/types/media';
import { computed } from 'vue';

const { id, type, src } = defineProps<{
  id?: number;
  type?: MediaType;
  src?: string;
}>();

const isImage = computed(() => type === MediaType.IMAGE);
const isVideo = computed(() => type === MediaType.VIDEO);
</script>

<template>
  <div class="slider-item">
    <img v-if="isImage" :src="src" :alt="`Slider item ID = ${id}`" />

    <video v-else-if="isVideo" controls>
      <source :src="src" type="video/mp4" />
    </video>

    <div v-else>Unknown media type</div>
  </div>
</template>

<style scoped>
.slider-item {
  width: 100%;
  height: 100%;
}

video,
img {
  width: 100%;
  height: 100%;
}
</style>

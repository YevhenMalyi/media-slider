<script setup lang="ts">
import MediaSlider from '@/components/MediaSlider.vue';
</script>

<template>
  <main>
    <MediaSlider />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100svh;
  width: 100svw;
  gap: 8px;
}
</style>

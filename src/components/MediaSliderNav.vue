<script setup lang="ts">
defineProps<{
  currentItemIndex: number;
  itemsCount: number;
}>();

const emit = defineEmits<{
  (e: 'on-change-item', index: number): void;
  (e: 'on-prev'): void;
  (e: 'on-next'): void;
}>();
</script>

<template>
  <div class="navigation">
    <button class="navigation-button" @click="emit('on-prev')">Prev</button>

    <button
      v-for="index in itemsCount"
      :class="{
        'navigation-dot': true,
        active: index === currentItemIndex + 1,
      }"
      :key="`nav-item-${index}`"
      @click="emit('on-change-item', index - 1)"
    ></button>

    <button class="navigation-button" @click="emit('on-next')">Next</button>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  height: 20px;
}

button {
  border: 0;
  padding: 0;
  cursor: pointer;
}

.navigation-button {
  transition: all 0.3s ease;
  color: lightgray;
  font-size: 12px;
  background-color: transparent;
}

.navigation-button:hover {
  color: #fff;
  font-size: 14px;
}

.navigation-dot {
  transition: all 0.3s ease;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: lightgray;
}

.navigation-dot:hover {
  width: 18px;
  height: 18px;
}

.navigation-dot.active {
  background-color: #fff;
}
</style>

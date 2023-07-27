<script setup>
import { computed } from "vue";

const props = defineProps({
  isPublicIcon: {
      type: Boolean,
      required: false, 
      default: false
  },
  path: {
    type: String,
    required: true,
  },
  w: {
    type: String,
    default: "w-6",
  },
  h: {
    type: String,
    default: "h-6",
  },
  size: {
    type: [String, Number],
    default: null,
  },
});

const spanClass = computed(
  () => `inline-flex justify-center items-center ${props.w} ${props.h}`
);

const iconSize = computed(() => props.size ?? 16);
</script>

<template>
  <span v-if="props.isPublicIcon" :class="spanClass">
    <img :src="props.path" alt="icon" class="w-5">
    <slot />
  </span>
  <span v-else :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      class="inline-block"
    >
      <path fill="currentColor" :d="path" />
    </svg>
    <slot />
  </span>
</template>

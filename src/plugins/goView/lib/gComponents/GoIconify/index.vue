<template>
  <iconify-icon
    :icon="icon"
    :rotate="`${rotate}deg`"
    :width="width"
    :style="{
      color: color
    }"
  ></iconify-icon>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#999999',
    required: false
  },
  width: {
    type: [String, Number],
    default: '20',
    required: false
  },
  rotate: {
    type: [String, Number],
    default: '0',
    required: false
  }
})
</script>

<template>
  <div class="go-config-item-box">
    <n-text class="item-left" depth="2">
      {{ name }}
      <n-space :size="5">
        <slot name="name"></slot>
      </n-space>
    </n-text>
    <div
      class="item-right"
      :style="{
        gridTemplateColumns: alone ? '1fr' : '1fr 1fr',
        ...itemRightStyle
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: false
  },
  alone: {
    type: Boolean,
    default: false,
    required: false
  },
  itemRightStyle: {
    type: Object,
    default: () => {},
    required: false
  }
})
</script>

<style lang="scss" scoped>
$leftWidth: 60px;
@include go('config-item-box') {
  position: relative;
  display: flex;
  margin: 20px 0;
  .item-left {
    width: $leftWidth;
    text-align: left;
    margin-top: 4px;
    margin-left: 10px;
    font-size: 12px;
  }
  .item-right {
    display: grid;
    grid-column-gap: 10px;
    width: calc(100% - #{$leftWidth});
  }
}
</style>

<template>
  <n-divider style="margin: 10px 0;"></n-divider>
  <n-collapse arrow-placement="right" :default-expanded-names="expanded ? name : null" accordion>
    <!-- 右侧 -->
    <template #header-extra>
      <div @click="click">
        <slot name="header"></slot>
      </div>
    </template>

    <n-collapse-item :title="name" :name="name">
      <slot></slot>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  expanded: {
    type: Boolean,
    required: false,
    default: false
  }
})

// const name = new Date().getTime()

const click = (e:MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}
</script>

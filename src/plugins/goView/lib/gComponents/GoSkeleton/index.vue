<template>
  <div v-show="load" class="go-skeleton">
    <div v-show="repeat == 1">
      <n-skeleton class="item" v-bind="$attrs"></n-skeleton>
    </div>
    <div v-show="repeat == 2">
      <n-skeleton class="item" v-bind="$attrs"></n-skeleton>
      <n-skeleton class="item" v-bind="$attrs" style="width: 60%;"></n-skeleton>
    </div>
    <div v-show="repeat > 2">
      <n-skeleton class="item" v-bind="$attrs" :repeat="repeat - 2"></n-skeleton>
      <n-skeleton class="item" v-bind="$attrs" style="width: 60%;"></n-skeleton>
      <n-skeleton class="item" v-bind="$attrs" style="width: 50%;"></n-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  repeat: {
    type: Number,
    default: 1
  },
  load: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
@include go("skeleton") {
  .item {
    margin-top: 5px;
    margin-left: 5px;
  }
  padding-bottom: 5px;
}
</style>
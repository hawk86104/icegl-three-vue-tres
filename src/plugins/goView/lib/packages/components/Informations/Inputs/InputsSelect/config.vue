<template>
  <collapse-item name="下拉配置" :expanded="true">
    <setting-item-box name="默认值" :alone="true">
      <n-select size="small" v-model:value="optionData.selectValue" :options="optionData.dataset" />
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>

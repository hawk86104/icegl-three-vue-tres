<template>
    <collapse-item name="分页配置" :expanded="true">
      <setting-item-box :alone="false" name="分页设置">
        <setting-item  name="默认页码" :alone="true">
          <n-input-number v-model:value="optionData.pageValue" size="small" placeholder="字体大小"></n-input-number>
        </setting-item>
        <setting-item  name="分页" :alone="true">
          <n-select v-model:value="optionData.pageSize" size="small"
                    :options="page" />
        </setting-item>
        <setting-item  name="页数" :alone="true">
          <n-input-number v-model:value="optionData.dataset" size="small" placeholder="字体大小"></n-input-number>
        </setting-item>
      </setting-item-box>
    </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import {CollapseItem, SettingItem, SettingItemBox} from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'

const page = [
  {label:'2',value:2},
  {label:'4',value:4},
  {label:'8',value:8},
  {label:'10',value:10},
  {label:'20',value:20}
]
defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
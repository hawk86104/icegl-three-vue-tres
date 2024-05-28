<template>
    <collapse-item name="输入框配置" :expanded="true">
        <setting-item-box name="默认值" :alone="true">
            <n-input v-model:value="optionData.dataset" placeholder="若未输入，则默认值为0" />
        </setting-item-box>
    </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'
defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
</script>

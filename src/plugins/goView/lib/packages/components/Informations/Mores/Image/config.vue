<template>
    <collapse-item name="属性" :expanded="true">
        <setting-item-box name="路径" :alone="true">
            <setting-item>
                <n-input v-model:value="optionData.dataset" size="small"></n-input>
            </setting-item>
        </setting-item-box>
        <setting-item-box name="样式">
            <setting-item name="类型">
                <n-select v-model:value="optionData.fit" size="small" :options="fitList"></n-select>
            </setting-item>
            <setting-item name="圆角">
                <n-input-number v-model:value="optionData.borderRadius" size="small" :min="0" placeholder="圆角"></n-input-number>
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

// 适应类型
const fitList = [
    {
        value: 'fill',
        label: 'fill',
    },
    {
        value: 'contain',
        label: 'contain',
    },
    {
        value: 'cover',
        label: 'cover',
    },
    {
        value: 'scale-down',
        label: 'scale-down',
    },
    {
        value: 'none',
        label: 'none',
    },
]
</script>

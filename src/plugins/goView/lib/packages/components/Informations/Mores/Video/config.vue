<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <collapse-item name="视频" expanded>
        <setting-item-box name="源" alone>
            <setting-item name="自定义源">
                <n-input v-model:value="optionData.dataset" size="small"></n-input>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="控制">
            <setting-item>
                <n-checkbox v-model:checked="optionData.loop" size="small">循环播放</n-checkbox>
            </setting-item>
            <setting-item>
                <n-checkbox v-model:checked="optionData.muted" size="small">静音</n-checkbox>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="样式">
            <setting-item name="类型">
                <n-select v-model:value="optionData.fit" size="small" :options="fitList"></n-select>
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

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

defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
</script>

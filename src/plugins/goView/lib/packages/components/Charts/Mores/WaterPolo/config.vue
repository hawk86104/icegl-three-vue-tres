<template>
    <CollapseItem v-for="(item, index) in seriesList" :key="index" name="水球" :expanded="true">
        <SettingItemBox name="内容">
            <SettingItem name="数值">
                <n-input-number v-model:value="item.data[0]" :min="0" :step="0.01" size="small" placeholder="水球数值"></n-input-number>
            </SettingItem>
            <SettingItem name="形状">
                <n-select v-model:value="item.shape" :options="shapes" placeholder="选择形状" />
            </SettingItem>
            <SettingItem name="文本">
                <n-input-number v-model:value="item.label.normal.textStyle.fontSize" :min="0" :step="1" size="small" placeholder="文字大小"> </n-input-number>
            </SettingItem>
            <SettingItem name="颜色1">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.color[0].colorStops[0].color"></n-color-picker>
            </SettingItem>
            <SettingItem name="颜色2">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.color[0].colorStops[1].color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="背景" :alone="true">
            <SettingItem>
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.backgroundStyle.color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { option, shapes } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

const seriesList = computed(() => {
    return props.optionData.series
})
</script>

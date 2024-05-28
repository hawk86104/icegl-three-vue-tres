<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"> </global-setting>
    <!-- 胶囊柱图 -->
    <collapse-item name="胶囊柱图" expanded>
        <SettingItemBox name="布局">
            <setting-item name="左侧边距">
                <n-input-number v-model:value="optionData.paddingLeft" :min="10" :step="1" size="small"></n-input-number>
            </setting-item>
            <setting-item name="右侧边距">
                <n-input-number v-model:value="optionData.paddingRight" :min="10" :step="1" size="small"></n-input-number>
            </setting-item>
            <setting-item name="每块高度(px)">
                <n-input-number v-model:value="optionData.itemHeight" :min="0" :step="1" size="small"></n-input-number>
            </setting-item>
        </SettingItemBox>
        <SettingItemBox name="文本">
            <setting-item name="所有文字大小">
                <n-input-number v-model:value="optionData.valueFontSize" :min="0" :step="1" size="small"></n-input-number>
            </setting-item>
            <setting-item name="单位">
                <n-input v-model:value="optionData.unit" size="small"></n-input>
            </setting-item>

            <SettingItem>
                <n-space>
                    <n-switch v-model:value="optionData.showValue" size="small"></n-switch>
                    <n-text>显示数值</n-text>
                </n-space>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="颜色">
            <setting-item v-for="(item, index) in optionData.colors" :key="index" :name="`颜色${index}`">
                <n-color-picker v-model:value="optionData.colors[index]" size="small" :modes="['hex']"></n-color-picker>
            </setting-item>
        </SettingItemBox>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

import { option } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})
</script>

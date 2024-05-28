<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`柱状图-${index + 1}`" :expanded="true">
        <SettingItemBox name="图形">
            <SettingItem name="宽度">
                <n-input-number v-model:value="item.barWidth" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
            <SettingItem name="圆角">
                <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <setting-item-box name="标签">
            <setting-item>
                <n-space>
                    <n-switch v-model:value="item.label.show" size="small" />
                    <n-text>展示标签</n-text>
                </n-space>
            </setting-item>
            <setting-item name="大小">
                <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
            </setting-item>
            <setting-item name="位置">
                <n-select
                    v-model:value="item.label.position"
                    :options="[
                        { label: 'top', value: 'top' },
                        { label: 'left', value: 'left' },
                        { label: 'right', value: 'right' },
                        { label: 'bottom', value: 'bottom' },
                    ]"
                />
            </setting-item>
        </setting-item-box>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const seriesList = computed(() => {
    return props.optionData.series
})
</script>

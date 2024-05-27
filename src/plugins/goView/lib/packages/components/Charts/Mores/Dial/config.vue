<template>
    <!-- 遍历 seriesList -->
    <CollapseItem :name="`圆环`" :expanded="true">
        <SettingItemBox name="数据">
            <SettingItem name="数值">
                <n-input-number v-model:value="config.dataset" :min="dialConfig.min" :max="dialConfig.max" :step="1" size="small" placeholder="数值">
                </n-input-number>
            </SettingItem>
        </SettingItemBox>
        <!-- Echarts 全局设置 -->
        <!-- 表盘刻度字体 -->
        <SettingItemBox name="字体">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="dialConfig.axisLabel.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="dialConfig.axisLabel.fontSize" :min="0" :step="1" size="small" placeholder="字体大小"> </n-input-number>
            </SettingItem>
        </SettingItemBox>
        <!-- 表盘 -->
        <SettingItemBox name="表盘外部">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="config.series[1].axisLine.lineStyle.color[1][1]"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <!-- 指针 -->
        <SettingItemBox name="指针">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="dialConfig.data[0].itemStyle.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="宽度">
                <n-input-number v-model:value="dialConfig.pointer.width" :min="0" :step="1" size="small" placeholder="数值"> </n-input-number>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="刻度">
            <SettingItem name="最小值">
                <n-input-number v-model:value="dialConfig.min" :min="0" :step="1" size="small" placeholder="数值"> </n-input-number>
            </SettingItem>
            <SettingItem name="最大值">
                <n-input-number v-model:value="dialConfig.max" :min="0" :step="1" size="small" placeholder="数值"> </n-input-number>
            </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker
                    size="small"
                    :modes="['hex']"
                    v-model:value="config.series[1].axisTick.lineStyle.color"
                    @update:value="updateClick"
                ></n-color-picker>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes'

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const config = computed(() => {
    return props.optionData
})

const dialConfig = computed(() => {
    return props.optionData.series[0]
})

const updateClick = (val: any) => {
    props.optionData.series[1].splitLine.lineStyle.color = val
}
</script>

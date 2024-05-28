<template>
    <v-chart :theme="themeColor" :init-options="initOptions" :option="option.value" autoresize></v-chart>
</template>

<script setup lang="ts">
import { PropType, watch, reactive } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import 'echarts-liquidfill/src/liquidFill.js'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import config from './config'
import { isPreview, isString, isNumber, colorGradientCustomMerge } from 'PLS/goView/lib/utils/global'
import { chartColorsSearch, defaultTheme } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'

const props = defineProps({
    themeSetting: {
        type: Object,
        required: true,
    },
    themeColor: {
        type: Object,
        required: true,
    },
    chartConfig: {
        type: Object as PropType<config>,
        required: true,
    },
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([CanvasRenderer, GridComponent])

const chartEditStore = useChartEditStore()

const option = reactive({
    value: {},
})

// 渐变色处理
watch(
    () => chartEditStore.getEditCanvasConfig.chartThemeColor,
    (newColor: keyof typeof chartColorsSearch) => {
        try {
            if (!isPreview()) {
                const themeColor =
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
                // 背景颜色
                props.chartConfig.option.series[0].backgroundStyle.color = themeColor[2]
                // 水球颜色
                props.chartConfig.option.series[0].color[0].colorStops = [
                    {
                        offset: 0,
                        color: themeColor[0],
                    },
                    {
                        offset: 1,
                        color: themeColor[1],
                    },
                ]
            }
            option.value = props.chartConfig.option
        } catch (error) {
            console.log(error)
        }
    },
    {
        immediate: true,
    },
)

// 数据处理
const dataHandle = (newData: number | string) => {
    newData = isString(newData) ? parseFloat(newData) : newData
    return parseFloat(newData.toFixed(2))
}

// 编辑
watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
        if (!isString(newData) && !isNumber(newData)) return
        props.chartConfig.option.series[0].data = [dataHandle(newData)]
        option.value = props.chartConfig.option
    },
    {
        immediate: true,
        deep: false,
    },
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {
    // @ts-ignore
    option.value.series[0].data = [dataHandle(newData)]
})
</script>

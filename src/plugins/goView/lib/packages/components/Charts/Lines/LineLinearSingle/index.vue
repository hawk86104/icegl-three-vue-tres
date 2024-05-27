<template>
    <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option.value" :manual-update="isPreview()" autoresize> </v-chart>
</template>

<script setup lang="ts">
import { PropType, watch, reactive } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { chartColorsSearch, defaultTheme } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { isPreview, colorGradientCustomMerge } from 'PLS/goView/lib/utils/global'

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

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const chartEditStore = useChartEditStore()
const option = reactive({
    value: {},
})

// 初始化与渐变色处理
watch(
    () => chartEditStore.getEditCanvasConfig.chartThemeColor,
    (newColor: keyof typeof chartColorsSearch) => {
        try {
            if (!isPreview()) {
                const themeColor =
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
                props.chartConfig.option.series.forEach((value: any) => {
                    value.lineStyle.shadowColor = themeColor[2]
                    value.lineStyle.color.colorStops.forEach((v: { color: string }, i: number) => {
                        v.color = themeColor[i]
                    })
                })
            }
            option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
            props.chartConfig.option = option.value
        } catch (error) {
            console.log(error)
        }
    },
    {
        immediate: true,
    },
)

watch(
    () => props.chartConfig.option.dataset,
    () => {
        option.value = props.chartConfig.option
    },
    {
        deep: false,
    },
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

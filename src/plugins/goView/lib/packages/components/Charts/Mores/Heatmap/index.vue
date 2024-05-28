<template>
    <v-chart
        ref="vChartRef"
        :init-options="initOptions"
        :theme="themeColor"
        :option="(option as EChartsOption)"
        :manual-update="isPreview()"
        autoresize
    ></v-chart>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { EChartsOption } from 'echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import dataJson from './data.json'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme, setOption } from 'PLS/goView/lib/packages/public/chart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, VisualMapComponent } from 'echarts/components'

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
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, LegendComponent, VisualMapComponent])

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const vChartRef = ref<typeof VChart>()

const dataSetHandle = (dataset: typeof dataJson) => {
    const { seriesData, xAxis, yAxis } = dataset
    if (xAxis) {
        // @ts-ignore
        props.chartConfig.option.xAxis.data = xAxis
    }
    if (yAxis) {
        // @ts-ignore
        props.chartConfig.option.yAxis.data = yAxis
    }
    if (seriesData) {
        props.chartConfig.option.series[0].data = seriesData
    }
    if (vChartRef.value && isPreview()) {
        setOption(vChartRef.value, props.chartConfig.option)
    }
}

watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
        try {
            dataSetHandle(newData)
        } catch (error) {
            console.log(error)
        }
    },
    {
        deep: false,
    },
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
    dataSetHandle(newData)
})
</script>

<template>
    <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, watch, PropType, nextTick } from 'vue'
import VChart from 'vue-echarts'
import { isObject, cloneDeep } from 'lodash'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
//引入柱状图 折线图
import { BarChart, LineChart } from 'echarts/charts'
import config, { includes, barSeriesItem, lineSeriesItem } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

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

use([DatasetComponent, CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

watch(
    () => props.chartConfig.option.dataset,
    (newData: any, oldData) => {
        try {
            if (!isObject(newData) || !('dimensions' in newData)) return
            if (Array.isArray((newData as any)?.dimensions)) {
                const seriesArr: (typeof barSeriesItem)[] = []
                // 对oldData进行判断，防止传入错误数据之后对旧维度判断产生干扰
                // 此处计算的是dimensions的Y轴维度，若是dimensions.length为0或1，则默认为1，排除X轴维度干扰
                const oldDimensions = Array.isArray(oldData?.dimensions) && oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1
                const newDimensions = (newData as any).dimensions.length >= 1 ? (newData as any).dimensions.length : 1
                const dimensionsGap = newDimensions - oldDimensions
                if (dimensionsGap < 0) {
                    props.chartConfig.option.series.splice(newDimensions - 1)
                } else if (dimensionsGap > 0) {
                    if (!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length) {
                        props.chartConfig.option.series = []
                    }
                    for (let i = 0; i < dimensionsGap; i++) {
                        seriesArr.push(cloneDeep(barSeriesItem))
                    }
                    props.chartConfig.option.series.push(...seriesArr)
                }
                replaceMergeArr.value = ['series']
                nextTick(() => {
                    replaceMergeArr.value = []
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    {
        deep: false,
    },
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

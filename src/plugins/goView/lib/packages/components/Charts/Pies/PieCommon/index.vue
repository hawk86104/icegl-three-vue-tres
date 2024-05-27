<template>
    <v-chart
        ref="vChartRef"
        autoresize
        :init-options="initOptions"
        :theme="themeColor"
        :option="option"
        :manual-update="isPreview()"
        @mouseover="handleHighlight"
        @mouseout="handleDownplay"
    ></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import dataJson from './data.json'

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
let seriesDataNum = -1
let seriesDataMaxLength = 0
let intervalInstance: any = null

use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent])

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// 会重新选择需要选中和展示的数据
const handleSeriesData = () => {
    if (seriesDataNum > -1) {
        vChartRef.value?.dispatchAction({
            type: 'downplay',
            dataIndex: seriesDataNum,
        })
    }
    seriesDataNum = seriesDataNum >= seriesDataMaxLength - 1 ? 0 : seriesDataNum + 1
    vChartRef.value?.dispatchAction({
        type: 'highlight',
        dataIndex: seriesDataNum,
    })
}

// 新增轮播
const addPieInterval = (newData?: typeof dataJson, skipPre = false) => {
    if (!skipPre && !Array.isArray(newData?.source)) return
    if (!skipPre) seriesDataMaxLength = newData?.source.length || 0
    clearInterval(intervalInstance)
    intervalInstance = setInterval(() => {
        handleSeriesData()
    }, 1000)
}

// 取消轮播
const clearPieInterval = () => {
    vChartRef.value?.dispatchAction({
        type: 'downplay',
        dataIndex: seriesDataNum,
    })
    clearInterval(intervalInstance)
    intervalInstance = null
}

// 处理鼠标聚焦高亮内容
const handleHighlight = () => {
    clearPieInterval()
}

// 处理鼠标取消悬浮
const handleDownplay = () => {
    if (props.chartConfig.option.isCarousel && !intervalInstance) {
        // 恢复轮播
        addPieInterval(undefined, true)
    }
}

watch(
    () => props.chartConfig.option.type,
    (newData) => {
        try {
            if (newData === 'nomal') {
                props.chartConfig.option.series[0].radius = '70%'
                props.chartConfig.option.series[0].roseType = false
            } else if (newData === 'ring') {
                props.chartConfig.option.series[0].radius = ['40%', '65%']
                props.chartConfig.option.series[0].roseType = false
            } else {
                props.chartConfig.option.series[0].radius = '70%'
                props.chartConfig.option.series[0].roseType = true
            }
        } catch (error) {
            console.log(error)
        }
    },
    { deep: false, immediate: true },
)

watch(
    () => props.chartConfig.option.isCarousel,
    (newData) => {
        if (newData) {
            addPieInterval(undefined, true)
            props.chartConfig.option.legend.show = false
        } else {
            props.chartConfig.option.legend.show = true
            clearPieInterval()
        }
    },
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
    clearPieInterval()
    if (props.chartConfig.option.isCarousel) {
        addPieInterval(newData)
    }
})

onMounted(() => {
    seriesDataMaxLength = dataJson.source.length
    if (props.chartConfig.option.isCarousel) {
        addPieInterval(undefined, true)
    }
})
</script>

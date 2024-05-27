<template>
    <v-chart
        ref="vChartRef"
        :init-options="initOptions"
        :theme="themeColor"
        :option="option"
        :manual-update="isPreview()"
        :update-options="{
            replaceMerge: replaceMergeArr,
        }"
        autoresize
    ></v-chart>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, PropType } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'

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

use([DatasetComponent, CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// dataset 无法变更条数的补丁
watch(
    () => props.chartConfig.option.dataset,
    (newData: { dimensions: any }, oldData) => {
        try {
            if (!isObject(newData) || !('dimensions' in newData)) return
            if (Array.isArray(newData?.dimensions)) {
                const seriesArr = []
                // 对oldData进行判断，防止传入错误数据之后对旧维度判断产生干扰
                // 此处计算的是dimensions的Y轴维度，若是dimensions.length为0或1，则默认为1，排除X轴维度干扰
                const oldDimensions = Array.isArray(oldData?.dimensions) && oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1
                const newDimensions = newData.dimensions.length >= 1 ? newData.dimensions.length : 1
                const dimensionsGap = newDimensions - oldDimensions
                if (dimensionsGap < 0) {
                    props.chartConfig.option.series.splice(newDimensions - 1)
                } else if (dimensionsGap > 0) {
                    if (!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length) {
                        props.chartConfig.option.series = []
                    }
                    for (let i = 0; i < dimensionsGap; i++) {
                        seriesArr.push(cloneDeep(seriesItem))
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

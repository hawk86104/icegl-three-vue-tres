<template>
    <v-chart
        ref="vChartRef"
        :init-options="initOptions"
        :theme="themeColor"
        :option="option"
        :manual-update="isPreview()"
        :update-options="{ replaceMerge: replaceMergeArr }"
        autoresize
    >
    </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, nextTick } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, EffectScatterChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { isPreview, isArray } from 'PLS/goView/lib/utils/global'
import {
    DatasetComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    MarkLineComponent,
    MarkAreaComponent,
    MarkPointComponent,
} from 'echarts/components'

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

use([
    DatasetComponent,
    CanvasRenderer,
    ScatterChart,
    EffectScatterChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    MarkLineComponent,
    MarkAreaComponent,
    MarkPointComponent,
])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// dataset 无法变更条数的补丁
watch(
    () => props.chartConfig.option.dataset,
    (newData, oldData) => {
        try {
            if (!isArray(newData)) return
            if (Array.isArray(newData)) {
                replaceMergeArr.value = ['series']
                // eslint-disable-next-line vue/no-mutating-props
                props.chartConfig.option.series = newData.map((item: { dimensions: any[] }, index: number) => ({
                    ...seriesItem,
                    datasetIndex: index,
                }))
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

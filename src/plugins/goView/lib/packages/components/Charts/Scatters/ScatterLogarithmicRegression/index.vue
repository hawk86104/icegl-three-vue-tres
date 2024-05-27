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
import { PropType, computed, ref } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import ecStat from 'echarts-stat'
import { use, registerTransform } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, LineChart } from 'echarts/charts'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import config, { includes } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent, TransformComponent, VisualMapComponent } from 'echarts/components'

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
    LineChart,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TransformComponent,
    VisualMapComponent,
    UniversalTransition,
    LabelLayout,
])

registerTransform((ecStat as any).transform.regression)

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

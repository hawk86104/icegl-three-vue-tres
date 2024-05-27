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
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { EChartsOption } from 'echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { FunnelChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
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
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, FunnelChart, GridComponent, TooltipComponent, LegendComponent])

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

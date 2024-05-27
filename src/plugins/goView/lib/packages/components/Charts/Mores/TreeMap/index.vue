<template>
    <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import dataJson from './data.json'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme, setOption } from 'PLS/goView/lib/packages/public/chart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview, isArray } from 'PLS/goView/lib/utils/global'

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

use([CanvasRenderer, TreemapChart])

const vChartRef = ref<typeof VChart>()

const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const dataSetHandle = (dataset: typeof dataJson) => {
    if (dataset) {
        props.chartConfig.option.series[0].data = dataset
        setOption(vChartRef.value, props.chartConfig.option)
    }
}

watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
        try {
            if (!isArray(newData)) return
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

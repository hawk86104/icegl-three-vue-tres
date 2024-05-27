<template>
    <div :style="getStyle(borderRadius)">
        <iframe :src="option.dataset" :width="w" :height="h" style="border-width: 0"></iframe>
    </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs } from 'vue'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const { borderRadius } = toRefs(props.chartConfig.option)

const option = shallowReactive({
    dataset: '',
})

const getStyle = (radius: number) => {
    return {
        borderRadius: `${radius}px`,
        overflow: 'hidden',
    }
}

// 编辑更新
watch(
    () => props.chartConfig.option.dataset,
    (newData: string) => {
        option.dataset = newData
    },
    {
        immediate: true,
    },
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
    option.dataset = newData
})
</script>

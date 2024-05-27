<template>
    <div :style="getStyle(borderRadius)">
        <n-image :object-fit="fit" preview-disabled :src="option.dataset" :fallback-src="requireErrorImg()" :width="w" :height="h" lazy />
    </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs } from 'vue'
import { requireErrorImg } from 'PLS/goView/lib/utils/global'
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
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

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
    (newData: any) => {
        option.dataset = newData
    },
    {
        immediate: true,
    },
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    option.dataset = newData
})
</script>

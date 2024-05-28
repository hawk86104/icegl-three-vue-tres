<template>
    <div>
        <n-carousel
            :autoplay="autoplay"
            :interval="interval"
            :centered-slides="centeredSlides"
            :direction="direction"
            :dot-placement="dotPlacement"
            :dot-type="dotType"
            :draggable="draggable"
            :effect="effect"
            :slides-per-view="slidesPerview"
            :show-arrow="showArrow"
            :show-dots="showDots"
        >
            <n-image
                v-for="(url, index) in option.dataset"
                preview-disabled
                :key="index"
                :object-fit="fit"
                :src="url"
                :fallback-src="requireErrorImg()"
                :width="w"
                :height="h"
            ></n-image>
        </n-carousel>
    </div>
</template>
<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { requireErrorImg } from 'PLS/goView/lib/utils/global'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const option = shallowReactive({
    dataset: configOption.dataset,
})

const { w, h } = toRefs(props.chartConfig.attr)
const { autoplay, interval, slidesPerview, direction, draggable, centeredSlides, effect, dotType, dotPlacement, showArrow, showDots, fit } = toRefs(
    props.chartConfig.option,
)

watch(
    () => props.chartConfig.option.dataset,
    (newData: any) => {
        option.dataset = newData
    },
    {
        immediate: true,
        deep: false,
    },
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    option.dataset = newData
})
</script>

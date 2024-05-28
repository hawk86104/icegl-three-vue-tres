<template>
    <svg :width="w" :height="h">
        <defs>
            <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
        </defs>
        <circle :cx="w / 2" :cy="h / 2" :r="inCircle" :fill="inCircleColor" filter="url(#blurFilter)" />
        <!-- 外部圆环 -->
        <circle :cx="w / 2" :cy="h / 2" :r="outCircle" fill="none" :stroke="outCircleColor" :stroke-width="outCircleWidth" />
    </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})
const { w, h } = toRefs(props.chartConfig.attr)
const { outCircle, inCircle, outCircleColor, inCircleColor, outCircleWidth } = toRefs(props.chartConfig.option)
</script>

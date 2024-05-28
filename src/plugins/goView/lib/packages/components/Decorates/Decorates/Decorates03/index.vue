<template>
    <div class="go-border-03" :style="`width: ${w}px; height: ${h}px`">
        <svg :width="20" :height="20">
            <polyline stroke-width="4" fill="transparent" :stroke="colors[0]" points="10, 0 19, 10 10, 20" />
            <polyline stroke-width="2" fill="transparent" :stroke="colors[1]" points="2, 0 11, 10 2, 20" />
        </svg>
        <span :style="`color: ${textColor};font-size: ${textSize}px`"> {{ dataset }}</span>
        <svg :width="20" :height="20">
            <polyline stroke-width="4" fill="transparent" :stroke="colors[0]" points="11, 0 2, 10 11, 20" />
            <polyline stroke-width="2" fill="transparent" :stroke="colors[1]" points="19, 0 10, 10 19, 20" />
        </svg>
    </div>
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
const { colors, dataset, textSize, textColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-03') {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        text-align: center;
        flex: 1;
    }
}
</style>

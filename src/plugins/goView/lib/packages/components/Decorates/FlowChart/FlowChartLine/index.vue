<template>
    <svg :width="w" :height="h">
        <polyline :stroke-width="lineWidth" :points="getStartPoint(-1, '')" :stroke="backgroundCol" fill="none" />
        <polyline :stroke-width="lineWidth" class="g-dashed-line" :points="getStartPoint(-1, '')" :stroke="animateCol" fill="none" />
        <polyline
            :stroke-width="lineWidth"
            v-for="(item, index) in lineNum"
            :key="index"
            :points="getStartPoint(index + 1, 'down')"
            :stroke="backgroundCol"
            fill="none"
        />
        <polyline
            :stroke-width="lineWidth"
            class="g-dashed-line"
            v-for="(item, index) in lineNum"
            :key="index"
            :points="getStartPoint(index + 1, 'down')"
            :stroke="animateCol"
            fill="none"
        />
        <polyline
            :stroke-width="lineWidth"
            v-for="(item, index) in lineNumUp"
            :key="index"
            :points="getStartPoint(index + 1, 'up')"
            :stroke="backgroundCol"
            fill="none"
        />
        <polyline
            :stroke-width="lineWidth"
            class="g-dashed-line"
            v-for="(item, index) in lineNumUp"
            :key="index"
            :points="getStartPoint(index + 1, 'up')"
            :stroke="animateCol"
            fill="none"
        />
    </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs, computed } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const { lineNum, lineNumUp, lineWidth, backgroundCol, animateCol } = toRefs(props.chartConfig.option)
const getStartPoint = (num: number, direction: string) => {
    const lineLength = w.value / 2
    const lineColLength = h.value / (lineNumUp.value + lineNum.value) - lineWidth.value / (lineNumUp.value + lineNum.value)
    if (num === -1 && direction === '') {
        return `0,${h.value / 2} ${lineLength},${h.value / 2} ${lineLength * 2},${h.value / 2}`
    } else if (num !== -1 && direction === 'down') {
        return `0,${h.value / 2} ${lineLength},${h.value / 2} ${lineLength},${h.value / 2 + num * lineColLength},${lineLength * 2},${
            h.value / 2 + num * lineColLength
        }`
    } else if (num !== -1 && direction === 'up') {
        return `0,${h.value / 2} ${lineLength},${h.value / 2} ${lineLength},${h.value / 2 - num * lineColLength},${lineLength * 2},${
            h.value / 2 - num * lineColLength
        }`
    }
}
</script>

<style scoped>
.g-dashed-line {
    stroke-dasharray: 20 130;
    stroke-dashoffset: 0;
    animation: move 3s infinite linear;
}
@keyframes move {
    0% {
        stroke-dashoffset: 20;
    }
    100% {
        stroke-dashoffset: -130;
    }
}
</style>

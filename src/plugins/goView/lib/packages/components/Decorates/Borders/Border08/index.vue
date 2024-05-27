<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <defs>
                <path :id="path" :d="pathD" fill="transparent" />
                <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fff" stop-opacity="1" />
                    <stop offset="100%" stop-color="#fff" stop-opacity="0" />
                </radialGradient>

                <mask :id="mask">
                    <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
                        <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
                    </circle>
                </mask>
            </defs>

            <polygon :fill="backgroundColor" :points="`5, 5 ${w - 5}, 5 ${w - 5} ${h - 5} 5, ${h - 5}`" />

            <use :stroke="colors[0]" stroke-width="1" :xlink:href="`#${path}`" />

            <use :stroke="colors[1]" stroke-width="3" :xlink:href="`#${path}`" :mask="`url(#${mask})`">
                <animate attributeName="stroke-dasharray" :from="`0, ${length}`" :to="`${length}, 0`" :dur="`${dur}s`" repeatCount="indefinite" />
            </use>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, computed } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { getUUID } from 'PLS/goView/lib/utils/global'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const path = `border-box-08-path-${getUUID()}`
const gradient = `border-box-08-gradient-${getUUID()}`
const mask = `border-box-08-mask-${getUUID()}`

const { w, h } = toRefs(props.chartConfig.attr)
const { colors, dur, backgroundColor, reverse } = toRefs(props.chartConfig.option)

const length = computed(() => {
    return (w.value + h.value - 5) * 2
})

const pathD = computed(() => {
    if (reverse.value) return `M 2.5, 2.5 L 2.5, ${h.value - 2.5} L ${w.value - 2.5}, ${h.value - 2.5} L ${w.value - 2.5}, 2.5 L 2.5, 2.5`
    return `M2.5, 2.5 L${w.value - 2.5}, 2.5 L${w.value - 2.5}, ${h.value - 2.5} L2.5, ${h.value - 2.5} L2.5, 2.5`
})
</script>

<style lang="scss" scoped>
@include go('border-box') {
}
</style>

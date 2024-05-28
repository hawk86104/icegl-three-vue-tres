<template>
    <div class="go-border-05">
        <svg :width="w" :height="h">
            <polyline :stroke="colors[1]" stroke-width="2" :points="`0, ${h / 2} ${w}, ${h / 2}`" />

            <polyline :stroke="colors[0]" stroke-width="2" :points="`5, ${h / 2} ${w * 0.2 - 3}, ${h / 2}`" :stroke-dasharray="`0, ${w * 0.2}`" fill="freeze">
                <animate
                    :id="animationId2"
                    attributeName="stroke-dasharray"
                    :values="`0, ${w * 0.2};${w * 0.2}, 0;`"
                    :dur="dur"
                    :begin="`${animationId1}.end`"
                    fill="freeze"
                />
                <animate attributeName="stroke-dasharray" :values="`${w * 0.2}, 0;0, ${w * 0.2}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </polyline>

            <polyline :stroke="colors[0]" stroke-width="2" :points="`${w * 0.2 + 3}, ${h / 2} ${w * 0.8 - 3}, ${h / 2}`" :stroke-dasharray="`0, ${w * 0.6}`">
                <animate
                    :id="animationId4"
                    attributeName="stroke-dasharray"
                    :values="`0, ${w * 0.6};${w * 0.6}, 0`"
                    :dur="dur"
                    :begin="`${animationId3}.end + 1s`"
                    fill="freeze"
                />
                <animate attributeName="stroke-dasharray" :values="`${w * 0.6}, 0;0, ${w * 0.6}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </polyline>

            <polyline :stroke="colors[0]" stroke-width="2" :points="`${w * 0.8 + 3}, ${h / 2} ${w - 5}, ${h / 2}`" :stroke-dasharray="`0, ${w * 0.2}`">
                <animate
                    :id="animationId6"
                    attributeName="stroke-dasharray"
                    :values="`0, ${w * 0.2};${w * 0.2}, 0`"
                    :dur="dur"
                    :begin="`${animationId5}.end + 1s`"
                    fill="freeze"
                />
                <animate attributeName="stroke-dasharray" :values="`${w * 0.2}, 0;0, ${w * 0.3}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </polyline>

            <circle cx="2" :cy="h / 2" r="2" :fill="colors[1]">
                <animate
                    :id="animationId1"
                    attributeName="fill"
                    :values="`${colors[1]};${colors[0]}`"
                    :begin="`0s;${animationId7}.end`"
                    dur="0.3s"
                    fill="freeze"
                />
            </circle>

            <circle :cx="w * 0.2" :cy="h / 2" r="2" :fill="colors[1]">
                <animate
                    :id="animationId3"
                    attributeName="fill"
                    :values="`${colors[1]};${colors[0]}`"
                    :begin="`${animationId2}.end`"
                    dur="0.3s"
                    fill="freeze"
                />
                <animate attributeName="fill" :values="`${colors[1]};${colors[1]}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </circle>

            <circle :cx="w * 0.8" :cy="h / 2" r="2" :fill="colors[1]">
                <animate
                    :id="animationId5"
                    attributeName="fill"
                    :values="`${colors[1]};${colors[0]}`"
                    :begin="`${animationId4}.end`"
                    dur="0.3s"
                    fill="freeze"
                />
                <animate attributeName="fill" :values="`${colors[1]};${colors[1]}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </circle>

            <circle :cx="w - 2" :cy="h / 2" r="2" :fill="colors[1]">
                <animate
                    :id="animationId7"
                    attributeName="fill"
                    :values="`${colors[1]};${colors[0]}`"
                    :begin="`${animationId6}.end`"
                    dur="0.3s"
                    fill="freeze"
                />
                <animate attributeName="fill" :values="`${colors[1]};${colors[1]}`" dur="0.01s" :begin="`${animationId7}.end`" fill="freeze" />
            </circle>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { getUUID } from 'PLS/goView/lib/utils/global'
const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const id = getUUID()
const { w, h } = toRefs(props.chartConfig.attr)
const { colors, dur } = toRefs(props.chartConfig.option)
const animationId1 = `d10ani1${id}`
const animationId2 = `d10ani2${id}`
const animationId3 = `d10ani3${id}`
const animationId4 = `d10ani4${id}`
const animationId5 = `d10ani5${id}`
const animationId6 = `d10ani6${id}`
const animationId7 = `d10ani7${id}`
</script>

<style lang="scss" scoped>
@include go('border-04') {
}
</style>

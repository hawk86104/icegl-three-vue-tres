<template>
    <div
        class="go-border-box"
        :style="`
      box-shadow: inset 0 0 40px ${colors[0]}; 
      border: 1px solid ${colors[1]};
      background-color: ${backgroundColor};
    `"
    >
        <svg :width="w" :height="h">
            <polyline class="go-border-line-w-2" :stroke="colors[0]" :points="`0, 25 0, 0 25, 0`" />
            <polyline class="go-border-line-w-2" :stroke="colors[0]" :points="`${w - 25}, 0 ${w}, 0 ${w}, 25`" />
            <polyline class="go-border-line-w-2" :stroke="colors[0]" :points="`${w - 25}, ${h} ${w}, ${h} ${w}, ${h - 25}`" />
            <polyline class="go-border-line-w-2" :stroke="colors[0]" :points="`0, ${h - 25} 0, ${h} 25, ${h}`" />

            <polyline class="go-border-line-w-5" :stroke="colors[1]" :points="`0, 10 0, 0 10, 0`" />
            <polyline class="go-border-line-w-5" :stroke="colors[1]" :points="`${w - 10}, 0 ${w}, 0 ${w}, 10`" />
            <polyline class="go-border-line-w-5" :stroke="colors[1]" :points="`${w - 10}, ${h} ${w}, ${h} ${w}, ${h - 10}`" />
            <polyline class="go-border-line-w-5" :stroke="colors[1]" :points="`0, ${h - 10} 0, ${h} 10, ${h}`" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const { colors, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
    polyline {
        fill: none;
        stroke-linecap: round;
    }
    .go-border-line-w-2 {
        stroke-width: 2;
    }
    .go-border-line-w-5 {
        stroke-width: 5;
    }
}
</style>

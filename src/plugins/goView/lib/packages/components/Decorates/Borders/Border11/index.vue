<template>
    <div class="go-border-box">
        <svg class="bv-border-svg-container" :width="w" :height="h">
            <polygon
                :fill="backgroundColor"
                :points="`
        23, 23 ${w - 24}, 23 ${w - 24}, ${h - 24} 23, ${h - 24}
      `"
            />

            <polyline class="go-border-line-1" :stroke="colors[0]" :points="`4, 4 ${w - 22} ,4 ${w - 22}, ${h - 22} 4, ${h - 22} 4, 4`" />
            <polyline class="go-border-line-3" :stroke="colors[1]" :points="`10, 10 ${w - 16}, 10 ${w - 16}, ${h - 16} 10, ${h - 16} 10, 10`" />
            <polyline class="go-border-line-3" :stroke="colors[1]" :points="`16, 16 ${w - 10}, 16 ${w - 10}, ${h - 10} 16, ${h - 10} 16, 16`" />
            <polyline class="go-border-line-3" :stroke="colors[1]" :points="`22, 22 ${w - 4}, 22 ${w - 4}, ${h - 4} 22, ${h - 4} 22, 22`" />
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
const { colors, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
    polyline {
        fill: none;
    }
    .go-line-line-1 {
        stroke-width: 1;
    }
    .go-line-line-3 {
        stroke-width: 3;
    }
}
</style>

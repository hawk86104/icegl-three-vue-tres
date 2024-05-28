<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <polygon
                :fill="backgroundColor"
                :points="`
        10, 22 ${w - 22}, 22 ${w - 22}, ${h - 86} ${w - 84}, ${h - 24} 10, ${h - 24}
      `"
            />

            <polyline
                class="bv-bb5-line-1"
                :stroke="colors[0]"
                :points="`8, 5 ${w - 5}, 5 ${w - 5}, ${h - 100}
          ${w - 100}, ${h - 5} 8, ${h - 5} 8, 5`"
            />
            <polyline
                class="bv-bb5-line-2"
                :stroke="colors[1]"
                :points="`3, 5 ${w - 20}, 5 ${w - 20}, ${h - 60}
          ${w - 74}, ${h - 5} 3, ${h - 5} 3, 5`"
            />
            <polyline class="bv-bb5-line-3" :stroke="colors[1]" :points="`50, 13 ${w - 35}, 13`" />
            <polyline class="bv-bb5-line-4" :stroke="colors[1]" :points="`15, 20 ${w - 35}, 20`" />
            <polyline class="bv-bb5-line-5" :stroke="colors[1]" :points="`15, ${h - 20} ${w - 110}, ${h - 20}`" />
            <polyline class="bv-bb5-line-6" :stroke="colors[1]" :points="`15, ${h - 13} ${w - 110}, ${h - 13}`" />
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
}
</style>

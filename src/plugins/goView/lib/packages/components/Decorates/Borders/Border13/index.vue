<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <polygon
                :fill="backgroundColor"
                :points="`
        7, 7 ${w - 7}, 7 ${w - 7}, ${h - 7} 7, ${h - 7}
      `"
            />

            <polyline :stroke="colors[0]" :points="`2, 2 ${w - 2} ,2 ${w - 2}, ${h - 2} 2, ${h - 2} 2, 2`" />
            <polyline :stroke="colors[1]" :points="`6, 6 ${w - 6}, 6 ${w - 6}, ${h - 6} 6, ${h - 6} 6, 6`" />
            <circle :fill="colors[0]" cx="11" cy="11" r="1" />
            <circle :fill="colors[0]" :cx="w - 11" cy="11" r="1" />
            <circle :fill="colors[0]" :cx="w - 11" :cy="h - 11" r="1" />
            <circle :fill="colors[0]" cx="11" :cy="h - 11" r="1" />
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

<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <polygon :fill="backgroundColor" :points="` 9, 7 ${w - 9}, 7 ${w - 9}, ${h - 7} 9, ${h - 7}`" />
            <circle :fill="colors[1]" cx="5" cy="5" r="2" />
            <circle :fill="colors[1]" :cx="w - 5" cy="5" r="2" />
            <circle :fill="colors[1]" :cx="w - 5" :cy="h - 5" r="2" />
            <circle :fill="colors[1]" cx="5" :cy="h - 5" r="2" />
            <polyline :stroke="colors[0]" :points="`10, 4 ${w - 10}, 4`" />
            <polyline :stroke="colors[0]" :points="`10, ${h - 4} ${w - 10}, ${h - 4}`" />
            <polyline :stroke="colors[0]" :points="`5, 70 5, ${h - 70}`" />
            <polyline :stroke="colors[0]" :points="`${w - 5}, 70 ${w - 5}, ${h - 70}`" />
            <polyline :stroke="colors[0]" :points="`3, 10, 3, 50`" />
            <polyline :stroke="colors[0]" :points="`7, 30 7, 80`" />
            <polyline :stroke="colors[0]" :points="`${w - 3}, 10 ${w - 3}, 50`" />
            <polyline :stroke="colors[0]" :points="`${w - 7}, 30 ${w - 7}, 80`" />
            <polyline :stroke="colors[0]" :points="`3, ${h - 10} 3, ${h - 50}`" />
            <polyline :stroke="colors[0]" :points="`7, ${h - 30} 7, ${h - 80}`" />
            <polyline :stroke="colors[0]" :points="`${w - 3}, ${h - 10} ${w - 3}, ${h - 50}`" />
            <polyline :stroke="colors[0]" :points="`${w - 7}, ${h - 30} ${w - 7}, ${h - 80}`" />
        </svg>
    </div>
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
const { colors, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
}
</style>

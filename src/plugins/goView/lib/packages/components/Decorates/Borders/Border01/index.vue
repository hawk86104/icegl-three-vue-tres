<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <polygon
                :fill="backgroundColor"
                :points="`10, 27 10, ${h - 27} 13, ${h - 24} 13, ${h - 21} 24, ${h - 11}
      38, ${h - 11} 41, ${h - 8} 73, ${h - 8} 75, ${h - 10} 81, ${h - 10}
      85, ${h - 6} ${w - 85}, ${h - 6} ${w - 81}, ${h - 10} ${w - 75}, ${h - 10}
      ${w - 73}, ${h - 8} ${w - 41}, ${h - 8} ${w - 38}, ${h - 11}
      ${w - 24}, ${h - 11} ${w - 13}, ${h - 21} ${w - 13}, ${h - 24}
      ${w - 10}, ${h - 27} ${w - 10}, 27 ${w - 13}, 25 ${w - 13}, 21
      ${w - 24}, 11 ${w - 38}, 11 ${w - 41}, 8 ${w - 73}, 8 ${w - 75}, 10
      ${w - 81}, 10 ${w - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
            />
        </svg>

        <svg :width="w" :height="h" :key="item" v-for="item in borders" :class="`border-item ${item}`">
            <polygon
                :fill="colors[0]"
                points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
            >
                <animate attributeName="fill" :values="`${colors[0]};${colors[1]};${colors[0]}`" :dur="`${dur}s`" begin="0s" repeatCount="indefinite" />
            </polygon>
            <polygon :fill="colors[1]" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
                <animate attributeName="fill" :values="`${colors[1]};${colors[0]};${colors[1]}`" :dur="`${dur}s`" begin="0s" repeatCount="indefinite" />
            </polygon>
            <polygon :fill="colors[0]" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
                <animate attributeName="fill" :values="`${colors[0]};${colors[1]};transparent`" :dur="`${dur + 1}s`" begin="0s" repeatCount="indefinite" />
            </polygon>
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

const borders = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

const { w, h } = toRefs(props.chartConfig.attr)
const { colors, dur, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
    .border-item {
        position: absolute;
        top: 0;
        left: 0;
    }
    .right-top {
        right: 0;
        transform: rotateY(180deg);
    }
    .left-bottom {
        bottom: 0;
        transform: rotateX(180deg);
    }
    .right-bottom {
        right: 0;
        bottom: 0;
        transform: rotateX(180deg) rotateY(180deg);
    }
}
</style>

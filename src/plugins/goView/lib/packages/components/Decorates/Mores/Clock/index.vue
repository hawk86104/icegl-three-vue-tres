<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 200 200`">
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2.5" dy="2.5" />
        </filter>

        <!-- 表盘 -->
        <g>
            <circle id="shadow" style="fill: rgba(0, 0, 0, 0.1)" cx="100" cy="100" r="87" filter="url(#innerShadow)"></circle>
            <circle id="circle" class="clock-border" cx="100" cy="100" r="80"></circle>
        </g>

        <!-- 指针 -->
        <g>
            <line x1="100" y1="100" x2="100" y2="55" style="stroke-width: 3px" class="clock-line">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="43200s"
                    repeatCount="indefinite"
                    :from="`${hoursAngle} 100 100`"
                    :to="`${hoursAngle + 360} 100 100`"
                />
            </line>
            <line x1="100" y1="100" x2="100" y2="40" style="stroke-width: 4px" class="clock-line">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="3600s"
                    repeatCount="indefinite"
                    :from="`${minuteAngle} 100 100`"
                    :to="`${minuteAngle + 360} 100 100`"
                />
            </line>
            <line x1="100" y1="100" x2="100" y2="30" style="stroke-width: 2px" class="clock-line">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="60s"
                    repeatCount="indefinite"
                    :from="`${secAngle} 100 100`"
                    :to="`${secAngle + 360} 100 100`"
                />
            </line>
        </g>

        <!-- 中心圆点 -->
        <circle id="center" style="fill: #128a86; stroke: #c1efed; stroke-width: 2px" cx="100" cy="100" r="3"></circle>

        <!-- 刻度线 -->
        <line
            x1="100"
            y1="30"
            x2="100"
            y2="40"
            class="clock-line"
            :transform="`rotate(${((num + 1) * 360) / 12} 100 100)`"
            v-for="num in 12"
            :key="`line_${num + 1}`"
        ></line>
    </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { option } from './config'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType & typeof option>,
        required: true,
    },
})

let { border, color, bgColor, borderColor } = toRefs(props.chartConfig.option)

const date = new Date()
const hoursAngle = (360 * date.getHours()) / 12 + date.getMinutes() / 2
const minuteAngle = (360 * date.getMinutes()) / 60
const secAngle = (360 * date.getSeconds()) / 60
</script>

<style lang="scss" scoped>
svg {
    display: block;
    width: 100%;
    height: 100%;
}
.clock-border {
    stroke: v-bind('borderColor');
    stroke-width: v-bind('border+"px"');
    fill: v-bind('bgColor');
}
.clock-line {
    stroke: v-bind('color') !important;
}
</style>

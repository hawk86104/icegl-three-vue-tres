<template>
    <div class="go-border-06">
        <svg xmlns="http://www.w3.org/2000/svg" :width="w" :height="h">
            <polygon class="stroke fill" :points="`15.5 6.5 20.5 0.5 50.5 0.5 55.5 6.5 15.5 6.5`" />
            <polygon class="stroke fill" :points="`15.5 ${h - 6.5} 20.5 ${h - 0.5} 50.5 ${h - 0.5} 55.5 ${h - 6.5} 15.5 ${h - 6.5}`" />
            <polygon class="stroke fill" :points="`${w - 15.5} 6.5 ${w - 20.5} 0.5 ${w - 50.5} 0.5 ${w - 55.5} 6.5 ${w - 15.5} 6.5`" />
            <polygon
                class="stroke fill"
                :points="`${w - 15.5} ${h - 6.5} ${w - 20.5} ${h - 0.5} ${w - 50.5} ${h - 0.5} ${w - 55.5} ${h - 6.5} ${w - 15.5} ${h - 6.5}`"
            />
            <polygon
                class="stroke fill"
                :points="`15.5 6.5 0.5 ${h / 2} 15.5 ${h - 6.5} ${w - 15.5} ${h - 6.5} ${w - 0.5} ${h / 2} ${w - 15.5} 6.5 15.5 6.5`"
            />
            <polyline class="stroke fill-none" :points="`20.5 14.5 8.5 ${h / 2} 20.5 ${h - 14.5}`" />
            <polyline class="stroke fill-none" :points="`${w - 20.5} 14.5 ${w - 8.5} ${h / 2} ${w - 20.5} ${h - 14.5}`" />
        </svg>
        <span class="text">{{ dataset }}</span>
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
const { colors, dataset, textSize, textColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-06') {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        position: absolute;
        z-index: -1;
    }

    .fill {
        fill: v-bind('colors[0]');
    }
    .fill-none {
        fill: none;
    }
    .stroke {
        stroke: v-bind('colors[1]');
    }

    .text {
        color: v-bind('textColor');
        font-size: v-bind('textSize+"px"');
    }
}
</style>

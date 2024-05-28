<template>
    <div class="go-decorates-line">
        <svg :width="w" :height="h">
            <line :x1="0" :y1="h / 2" :x2="w" :y2="h / 2" :stroke="o_color" :stroke-width="h"></line>
            <line :x1="0" :y1="h / 2" :x2="w" :y2="h / 2" :stroke="i_color" :stroke-width="h / 2" :class="line_class"></line>
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
const { o_color, i_color, line_class } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
.go-decorates-line {
    font-size: 0;
}

/* 正向流动效果 */
.svg_ani_flow {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ani_flow 10s linear infinite;
    animation-fill-mode: forwards;
    -webkit-animation: ani_flow 10s linear infinite;
    -webkit-animation-fill-mode: forwards;
}

@keyframes ani_flow {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 13, 5;
    }
}
@-webkit-keyframes ani_flow {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 13, 5;
    }
}

/* 停止流动效果 */
.svg_ani_flow_stop {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ani_flow_stop 10s linear infinite;
    animation-fill-mode: forwards;
    -webkit-animation: ani_flow_stop 10s linear infinite;
    -webkit-animation-fill-mode: forwards;
}

@keyframes ani_flow_stop {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 10, 5;
    }
}
@-webkit-keyframes ani_flow_stop {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 10, 5;
    }
}
/* 反向流动效果 */
.svg_ani_flow_back {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ani_flow_back 10s linear infinite;
    animation-fill-mode: forwards;
    -webkit-animation: ani_flow_back 10s linear infinite;
    -webkit-animation-fill-mode: forwards;
}

@keyframes ani_flow_back {
    from {
        stroke-dasharray: 13, 5;
    }

    to {
        stroke-dasharray: 10, 5;
    }
}
@-webkit-keyframes ani_flow_stop {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 10, 5;
    }
}
/* 以最大40高度填充 */
.svg_ani_fill_h40 {
    animation: ani_fill_h40 5s linear infinite;
    animation-fill-mode: forwards;
    -webkit-animation: ani_fill_h40 5s linear infinite;
    -webkit-animation-fill-mode: forwards;
}

@keyframes ani_fill_h40 {
    from {
        height: 0px;
    }

    to {
        height: 40px;
    }
}
@-webkit-keyframes ani_flow_stop {
    from {
        stroke-dasharray: 10, 5;
    }

    to {
        stroke-dasharray: 10, 5;
    }
}
</style>

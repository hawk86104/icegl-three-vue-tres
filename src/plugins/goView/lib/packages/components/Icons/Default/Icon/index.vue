<template>
    <div class="go-icon-box">
        <GoIconify :icon="((dataset || '') as string)" :color="color" :width="size" :rotate="rotate" />
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { GoIconify } from 'PLS/goView/lib/gComponents/GoIconify'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, color, size, rotate } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('icon-box') {
    display: flex;
    align-items: center;
    justify-content: center;
    width: v-bind('`${w}px`');
    height: v-bind('`${h}px`');
}
</style>

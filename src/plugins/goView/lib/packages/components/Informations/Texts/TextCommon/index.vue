<template>
    <div class="go-text-box">
        <div class="content">
            <span style="cursor: pointer; white-space: pre-wrap" v-if="link" @click="click">{{ option.dataset }}</span>
            <span style="white-space: pre-wrap" v-else>{{ option.dataset }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType & typeof option>,
        required: true,
    },
})

const {
    linkHead,
    link,
    fontColor,
    fontSize,
    letterSpacing,
    paddingY,
    paddingX,
    textAlign,
    borderWidth,
    borderColor,
    borderRadius,
    writingMode,
    backgroundColor,
    fontWeight,
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
    dataset: configOption.dataset,
})

// 手动更新
watch(
    () => props.chartConfig.option.dataset,
    (newData: any) => {
        option.dataset = newData
    },
    {
        immediate: true,
        deep: false,
    },
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
    option.dataset = newData
})

//打开链接
const click = () => {
    window.open(linkHead.value + link.value)
}
</script>

<style lang="scss" scoped>
@include go('text-box') {
    display: flex;
    align-items: center;
    justify-content: v-bind('textAlign');
    overflow: hidden;

    .content {
        color: v-bind('fontColor');
        padding: v-bind('`${paddingY}px ${paddingX}px`');
        font-size: v-bind('fontSize + "px"');
        letter-spacing: v-bind('letterSpacing + "px"');
        writing-mode: v-bind('writingMode');
        font-weight: v-bind('fontWeight');
        border-style: solid;
        border-width: v-bind('borderWidth + "px"');
        border-radius: v-bind('borderRadius + "px"');
        border-color: v-bind('borderColor');

        background-color: v-bind('backgroundColor');
    }
}
</style>

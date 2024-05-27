<template>
    <n-select v-model:value="option.value.selectValue" :options="option.value.dataset" :style="`width:${w}px;`" @update:value="onChange" />
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartInteract } from 'PLS/goView/lib/gHooks/'
import { InteractEventOn } from 'PLS/goView/lib/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
    value: {
        selectValue: props.chartConfig.option.selectValue,
        dataset: props.chartConfig.option.dataset,
    },
})

// 监听事件改变
const onChange = (v: string) => {
    // 存储到联动数据
    useChartInteract(props.chartConfig, useChartEditStore, { [ComponentInteractParamsEnum.DATA]: v }, InteractEventOn.CHANGE)
}

// 手动更新
watch(
    () => props.chartConfig.option,
    (newData: any) => {
        option.value = newData
        onChange(newData.selectValue)
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

<style lang="scss" scoped>
@include deep() {
    .n-base-selection-label {
        height: v-bind('h + "px"');
        display: flex;
        align-items: center;
    }
}
</style>

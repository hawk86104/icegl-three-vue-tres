<template>
    <n-tabs :type="option.value.tabType" @update:value="onChange" :default-value="option.value.tabLabel">
        <n-tab v-for="(item, index) in option.value.dataset" :name="item.label" :key="index"> {{ item.label }} </n-tab>
    </n-tabs>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
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
    value: cloneDeep(props.chartConfig.option),
})

// 监听事件改变
const onChange = (v: string) => {
    if (v === undefined) return
    const selectItem = option.value.dataset.find((item: { label: string; value: any }) => item.label === v)
    // 存储到联动数据
    useChartInteract(props.chartConfig, useChartEditStore, { [ComponentInteractParamsEnum.DATA]: selectItem.value }, InteractEventOn.CHANGE)
}

// 手动更新
watch(
    () => props.chartConfig.option,
    (newData: any) => {
        option.value = newData
        onChange(newData.tabValue)
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

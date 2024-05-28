<template>
    <div>
        <n-pagination
            @on-update:page="onChange"
            :style="`width:${w}px;`"
            v-model:page="option.value.pageValue"
            :page-count="option.value.dataset"
            :page-slot="7"
            show-size-picker
            :page-sizes="option.value.sizeValue"
            v-model:page-size="option.value.pageSize"
        />
    </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, shallowReactive, watch } from 'vue'
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
        pageValue: props.chartConfig.option.pageValue,
        dataset: props.chartConfig.option.dataset,
        sizeValue: props.chartConfig.option.sizeValue,
        pageSize: props.chartConfig.option.pageSize,
    },
})

const onChange = (v: number, v2: number) => {
    if (v == undefined) return
    // 存储到联动数据
    useChartInteract(
        props.chartConfig,
        useChartEditStore,
        {
            [ComponentInteractParamsEnum.DATA]: v,
            [ComponentInteractParamsEnum.DATA2]: v2,
        },
        InteractEventOn.CHANGE,
    )
}

// 手动更新
watch(
    () => props.chartConfig.option,
    (newData: any) => {
        option.value = newData
        onChange(newData.pageValue, newData.pageSize)
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

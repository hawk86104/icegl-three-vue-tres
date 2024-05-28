<template>
    <n-date-picker
        v-model:value="option.dataset"
        clearable
        :panel="!!chartConfig.option.isPanel"
        :type="chartConfig.option.componentInteractEventKey"
        :style="`width:${w}px;`"
        @update:value="onChange"
    />
</template>

<script setup lang="ts">
import { computed, PropType, ref, shallowReactive, toRefs, watch } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartInteract } from 'PLS/goView/lib/gHooks/'
import { InteractEventOn } from 'PLS/goView/lib/enums/eventEnum'
import { ComponentInteractEventEnum, ComponentInteractParamsEnum, DefaultTypeEnum } from './interact'
import dayjs, { ManipulateType } from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
const rangeDate = ref<number | number[]>()

const option = shallowReactive({
    dataset: props.chartConfig.option.dataset,
})

const isRange = computed(() => {
    return props.chartConfig.option.componentInteractEventKey.endsWith('range')
})

// 监听事件改变
const onChange = (v: number | number[] | null) => {
    if (isRange.value) {
        let dateStart = null
        let dateEnd = null
        let daterange = null
        if (v instanceof Array) {
            dateStart = v[0]
            dateEnd = v[1]
            daterange = `${v[0]}-${v[1]}`
        }
        // 存储到联动数据
        useChartInteract(
            props.chartConfig,
            useChartEditStore,
            {
                [ComponentInteractParamsEnum.DATE_START]: dateStart,
                [ComponentInteractParamsEnum.DATE_END]: dateEnd,
                [ComponentInteractParamsEnum.DATE_RANGE]: daterange,
            },
            InteractEventOn.CHANGE,
        )
    } else {
        // 存储到联动数据
        useChartInteract(props.chartConfig, useChartEditStore, { [ComponentInteractParamsEnum.DATE]: v }, InteractEventOn.CHANGE)
    }
}

const getDiffDate = (type: ComponentInteractEventEnum, date: dayjs.Dayjs) => {
    // 注册 quarterOfYear 插件
    dayjs.extend(quarterOfYear)
    switch (type) {
        case ComponentInteractEventEnum.DATE:
        case ComponentInteractEventEnum.DATE_RANGE:
            date = date.startOf('day')
            break
        case ComponentInteractEventEnum.MONTH:
        case ComponentInteractEventEnum.MONTH_RANGE:
            date = date.startOf('month')
            break
        case ComponentInteractEventEnum.YEAR:
        case ComponentInteractEventEnum.YEAR_RANGE:
            date = date.startOf('year')
            break
        case ComponentInteractEventEnum.QUARTER:
        case ComponentInteractEventEnum.QUARTER_RANGE:
            date = date.startOf('quarter')
            break
        default:
            break
    }
    return date
}

watch(
    () => {
        return {
            type: props.chartConfig.option.componentInteractEventKey as ComponentInteractEventEnum,
            defaultType: props.chartConfig.option.defaultType as string,
            differValue: props.chartConfig.option.differValue as number[],
            differUnit: props.chartConfig.option.differUnit as ManipulateType[],
            dataset: props.chartConfig.option.dataset as number | number[] | null,
        }
    },
    (newData, oldData) => {
        const hasTypeChanged = newData.type !== oldData?.type
        const hasDefaultTypeChanged = newData.defaultType !== oldData?.defaultType
        const hasDifferValueChanged = newData.differValue !== oldData?.differValue
        const hasDifferUnitChanged = newData.differUnit !== oldData?.differUnit

        if (hasTypeChanged || hasDefaultTypeChanged || hasDifferValueChanged || hasDifferUnitChanged) {
            if (newData.defaultType === DefaultTypeEnum.NONE) {
                props.chartConfig.option.dataset = null
            } else if (newData.defaultType === DefaultTypeEnum.DYNAMIC) {
                let date = dayjs()
                if (isRange.value) {
                    props.chartConfig.option.dataset = [
                        getDiffDate(newData.type, date.add(newData.differValue[0], newData.differUnit[0])).valueOf(),
                        getDiffDate(newData.type, date.add(newData.differValue[1], newData.differUnit[1])).valueOf(),
                    ]
                } else {
                    props.chartConfig.option.dataset = getDiffDate(newData.type, date.add(newData.differValue[0], newData.differUnit[0])).valueOf()
                }
            }
        }
        option.dataset = props.chartConfig.option.dataset
        onChange(option.dataset)
    },
    {
        immediate: true,
    },
)
</script>

<style lang="scss" scoped>
@include deep() {
    .n-input {
        height: v-bind('h + "px"');
        display: flex;
        align-items: center;
    }
}
</style>

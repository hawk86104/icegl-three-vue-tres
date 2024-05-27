<template>
    <div
        v-if="state.mergedConfig"
        class="go-dv-capsule-chart"
        :style="{
            fontSize: numberSizeHandle(state.mergedConfig.valueFontSize),
            paddingLeft: numberSizeHandle(state.mergedConfig.paddingLeft),
            paddingRight: numberSizeHandle(state.mergedConfig.paddingRight),
        }"
    >
        <div class="label-column">
            <div
                v-for="item in state.mergedConfig.dataset.source"
                :key="item[state.mergedConfig.dataset.dimensions[0]]"
                :style="{ height: state.capsuleItemHeight, lineHeight: state.capsuleItemHeight }"
            >
                {{ item[state.mergedConfig.dataset.dimensions[0]] }}
            </div>
            <div class="laset">&nbsp;</div>
        </div>

        <div class="capsule-container">
            <div v-for="(capsule, index) in state.capsuleLength" :key="index" class="capsule-item" :style="{ height: state.capsuleItemHeight }">
                <div
                    class="capsule-item-column"
                    :style="`width: ${capsule * 100}%; background-color: ${
                        state.mergedConfig.colors[index % state.mergedConfig.colors.length]
                    };height:calc(100% - ${2}px);`"
                >
                    <div v-if="state.mergedConfig.showValue" class="capsule-item-value">
                        {{ state.capsuleValue[index] }}
                    </div>
                </div>
            </div>

            <div class="unit-label">
                <div v-for="(label, index) in state.labelData" :key="label + index">
                    {{ label }}
                </div>
            </div>
        </div>

        <div v-if="state.mergedConfig.unit" class="unit-text">
            {{ state.mergedConfig.unit }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, PropType } from 'vue'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import config, { option } from './config'
import cloneDeep from 'lodash/cloneDeep'

type DataProps = {
    name: string | number
    value: string | number
    [key: string]: string | number
}

interface StateProps {
    defaultConfig: {
        dataset: {
            dimensions: Array<string>
            source: Array<DataProps>
        }
        colors: Array<string>
        unit: string
        showValue: boolean
        itemHeight: number
        valueFontSize: number
        paddingLeft: number
        paddingRight: number
    }
    mergedConfig: any
    capsuleLength: Array<number>
    capsuleValue: Array<string | Object>
    labelData: Array<number>
    capsuleItemHeight: string
}

const props = defineProps({
    chartConfig: {
        type: Object as PropType<config>,
        default: () => ({}),
    },
})

const state = reactive<StateProps>({
    defaultConfig: option,
    mergedConfig: null,
    capsuleLength: [],
    capsuleValue: [],
    labelData: [],
    capsuleItemHeight: '',
})

watch(
    () => props.chartConfig.option,
    (newVal) => {
        calcData(newVal)
    },
    {
        deep: true,
    },
)

const calcData = (data: any, type?: string) => {
    let cloneConfig = cloneDeep(props.chartConfig.option || {})
    state.mergedConfig = cloneConfig
    if (type == 'preview') {
        cloneConfig.dataset = data
    }
    calcCapsuleLengthAndLabelData(state.mergedConfig.dataset)
}

// 数据解析
const calcCapsuleLengthAndLabelData = (dataset: any) => {
    try {
        const { source } = dataset
        if (!source || !source.length) return

        state.capsuleItemHeight = numberSizeHandle(state.mergedConfig.itemHeight)
        const capsuleValue = source.map((item: DataProps) => item[state.mergedConfig.dataset.dimensions[1]])

        const maxValue = Math.max(...capsuleValue)

        state.capsuleValue = capsuleValue

        state.capsuleLength = capsuleValue.map((v: any) => (maxValue ? v / maxValue : 0))

        const oneFifth = maxValue / 5

        const labelData = Array.from(new Set(new Array(6).fill(0).map((v, i) => Math.ceil(i * oneFifth))))

        state.labelData = labelData
    } catch (error) {
        console.warn(error)
    }
}

const numberSizeHandle = (val: string | number) => {
    return val + 'px'
}

onMounted(() => {
    calcData(props.chartConfig.option)
})

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    calcData(newData, 'preview')
})
</script>

<style lang="scss" scoped>
@include go('dv-capsule-chart') {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 20px;
    padding-right: 50px;
    color: #b9b8cc;

    .label-column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        > div:not(:last-child) {
            margin: 5px 0;
        }
    }

    .capsule-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .capsule-item {
        box-shadow: 0 0 3px #999;
        height: 10px;
        margin: 5px 0px;
        border-radius: 5px;

        .capsule-item-column {
            position: relative;
            height: 8px;
            margin-top: 1px;
            border-radius: 5px;
            transition: all 0.3s;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .capsule-item-value {
                padding-left: 10px;
                transform: translateX(100%);
            }
        }
    }

    .unit-label {
        height: 20px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .unit-text {
        text-align: right;
        display: flex;
        align-items: flex-end;
        line-height: 20px;
        margin-left: 10px;
    }
}
</style>

<template>
    <global-setting :optionData="optionData"></global-setting>
    <collapse-item name="词云" expanded>
        <setting-item-box name="形状">
            <setting-item>
                <n-select v-model:value="optionData.series[0].shape" size="small" :options="ShapeEnumList" />
            </setting-item>
            <setting-item>
                <n-checkbox v-model:checked="optionData.series[0].drawOutOfBound" size="small">允许出边</n-checkbox>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="布局">
            <setting-item name="宽度">
                <n-slider v-model:value="series.width" :min="0" :max="100" :format-tooltip="sliderFormatTooltip" @update:value="updateWidth"></n-slider>
            </setting-item>
            <setting-item name="高度">
                <n-slider v-model:value="series.height" :min="0" :max="100" :format-tooltip="sliderFormatTooltip" @update:value="updateHeight"></n-slider>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="样式" alone>
            <setting-item name="字体区间(最小/最大字体)">
                <n-slider v-model:value="optionData.series[0].sizeRange" range :step="1" :min="6" :max="100" />
            </setting-item>
            <setting-item name="旋转角度">
                <n-slider v-model:value="series.rotationStep" :step="15" :min="0" :max="45" @update:value="updateRotation" />
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { option, ShapeEnumList } from './config'
// eslint-disable-next-line no-unused-vars
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

const series = computed(() => {
    const { width, height, rotationStep } = props.optionData.series[0]
    return {
        width: +width.replace('%', ''),
        height: +height.replace('%', ''),
        rotationStep,
    }
})

const sliderFormatTooltip = (v: number) => {
    return `${v}%`
}

const updateWidth = (value: number) => {
    props.optionData.series[0].width = `${value}%`
}

const updateHeight = (value: number) => {
    props.optionData.series[0].height = `${value}%`
}

const updateRotation = (value: number) => {
    props.optionData.series[0].rotationStep = value
    props.optionData.series[0].rotationRange = value === 0 ? [0, 0] : [-90, 90]
}
</script>

<template>
    <div>
        <!-- Echarts 全局设置 -->
        <global-setting :optionData="optionData"></global-setting>
        <CollapseItem name="雷达" :expanded="true">
            <SettingItemBox name="样式">
                <SettingItem>
                    <n-checkbox v-model:checked="radarConfig.splitArea.show">背景</n-checkbox>
                </SettingItem>
                <SettingItem>
                    <n-checkbox v-model:checked="radarConfig.splitLine.show">分割线</n-checkbox>
                </SettingItem>
                <SettingItem name="雷达形状">
                    <n-select v-model:value="radarConfig.shape" size="small" :options="RadarShapeEnumList" placeholder="选择形状" />
                </SettingItem>
            </SettingItemBox>

            <SettingItemBox name="坐标轴">
                <SettingItem>
                    <n-checkbox v-model:checked="radarConfig.axisLine.show">轴线</n-checkbox>
                </SettingItem>
                <SettingItem>
                    <n-checkbox v-model:checked="radarConfig.axisTick.show">刻度</n-checkbox>
                </SettingItem>
            </SettingItemBox>

            <SettingItemBox name="范围">
                <setting-item :name="`最小值：${radarProp.radius[0]}%`">
                    <n-slider
                        v-model:value="radarProp.radius[0]"
                        :min="0"
                        :max="100"
                        :format-tooltip="sliderFormatTooltip"
                        @update:value="updateRadius0"
                    ></n-slider>
                </setting-item>
                <setting-item :name="`最大值：${radarProp.radius[1]}%`">
                    <n-slider
                        v-model:value="radarProp.radius[1]"
                        :min="0"
                        :max="100"
                        :format-tooltip="sliderFormatTooltip"
                        @update:value="updateRadius1"
                    ></n-slider>
                </setting-item>
            </SettingItemBox>

            <SettingItemBox name="偏移">
                <setting-item :name="`X 轴值：${radarProp.center[0]}%`">
                    <n-slider
                        v-model:value="radarProp.center[0]"
                        :min="0"
                        :max="100"
                        :format-tooltip="sliderFormatTooltip"
                        @update:value="updateCenter0"
                    ></n-slider>
                </setting-item>
                <setting-item :name="`Y 轴值：${radarProp.center[1]}%`">
                    <n-slider
                        v-model:value="radarProp.center[1]"
                        :min="0"
                        :max="100"
                        :format-tooltip="sliderFormatTooltip"
                        @update:value="updateCenter1"
                    ></n-slider>
                </setting-item>
            </SettingItemBox>

            <SettingItemBox name="指示器">
                <SettingItem name="颜色">
                    <n-color-picker size="small" :modes="['hex']" v-model:value="radarConfig.axisName.color"></n-color-picker>
                </SettingItem>
                <SettingItem name="大小">
                    <n-input-number v-model:value="radarConfig.axisName.fontSize" size="small" :min="9"></n-input-number>
                </SettingItem>
                <SettingItem>
                    <n-checkbox v-model:checked="radarConfig.axisName.show">文字标签</n-checkbox>
                </SettingItem>
            </SettingItemBox>

            <SettingItemBox name="系列" :alone="true">
                <SettingItem name="背景透明度">
                    <n-input-number v-model:value="optionData.series[0].areaStyle.opacity" size="small" :min="0" :max="1" :step="0.1"></n-input-number>
                </SettingItem>
            </SettingItemBox>
        </CollapseItem>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option, RadarShapeEnumList } from './config'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})

const radarConfig = computed<typeof option.radar>(() => {
    return props.optionData.radar
})

const radarProp = reactive({
    radius: [0, 60],
    center: [50, 50],
})

// 更新处理
const updateRadius0 = (value: number) => {
    props.optionData.radar.radius[0] = `${value}%`
}

const updateRadius1 = (value: number) => {
    props.optionData.radar.radius[1] = `${value}%`
}

// 更新处理
const updateCenter0 = (value: number) => {
    props.optionData.radar.center[0] = `${value}%`
}

const updateCenter1 = (value: number) => {
    props.optionData.radar.center[1] = `${value}%`
}

// 百分比格式化 percent
const sliderFormatTooltip = (v: number) => {
    return `${v}%`
}
</script>

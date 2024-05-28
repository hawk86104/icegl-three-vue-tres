<template>
    <!-- 默认展开 -->
    <CollapseItem name="进度条" :expanded="true">
        <SettingItemBox name="内容">
            <SettingItem name="数值">
                <!-- 与 config.ts 里的 option 对应 --><!-- n-input-number 是 NaiveUI 的控件 -->
                <n-input-number v-model:value="optionData.dataset" size="small" :min="0" placeholder="进度值"></n-input-number>
            </SettingItem>
            <setting-item name="单位">
                <n-input v-model:value="optionData.unit" size="small"></n-input>
            </setting-item>
        </SettingItemBox>

        <SettingItemBox name="轨道">
            <SettingItem name="形状">
                <n-select v-model:value="optionData.type" :options="types" placeholder="选择形状" />
            </SettingItem>

            <!-- 颜色粗细等等... -->
            <SettingItem name="进度条颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="轨道颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.railColor"></n-color-picker>
            </SettingItem>
            <setting-item name="偏移角度" v-if="optionData.type !== types[0].value">
                <n-input-number v-model:value="optionData.offsetDegree" size="small"></n-input-number>
            </setting-item>
            <SettingItem v-if="optionData.type == types[0].value">
                <n-space>
                    <n-switch v-model:value="optionData.processing" size="small" />
                    <n-text>进行时动画</n-text>
                </n-space>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="指标">
            <SettingItem name="位置" v-if="optionData.type == types[0].value">
                <n-select v-model:value="optionData.indicatorPlacement" :options="indicatorPlacements" placeholder="选择形状" />
            </SettingItem>
            <SettingItem name="文本颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.indicatorTextColor"></n-color-picker>
            </SettingItem>
            <setting-item name="文本大小">
                <n-input-number v-model:value="optionData.indicatorTextSize" size="small"></n-input-number>
            </setting-item>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

// 获取 option 的数据，便于使用 typeof 获取类型
import { option, types, indicatorPlacements } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
</script>

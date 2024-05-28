<template>
    <CollapseItem name="内容" :expanded="true">
        <SettingItemBox name="字体">
            <SettingItem name="大小">
                <n-input-number v-model:value="optionData.timeSize" size="small" :min="1"></n-input-number>
            </SettingItem>
            <SettingItem name="粗细">
                <n-select v-model:value="optionData.fontWeight" size="small" :options="fontWeightOptions" />
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="间距">
            <SettingItem name="字距">
                <n-input-number v-model:value="optionData.timeTextIndent" size="small" :min="1"></n-input-number>
            </SettingItem>
            <SettingItem name="行距">
                <n-input-number v-model:value="optionData.timeLineHeight" size="small" :min="1"></n-input-number>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="颜色">
            <SettingItem name="时间">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.timeColor"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="阴影">
            <SettingItem>
                <n-space>
                    <n-switch v-model:value="optionData.showShadow" size="small" />
                    <n-text>展示阴影</n-text>
                </n-space>
            </SettingItem>
            <SettingItem name="x"> <n-input-number v-model:value="optionData.hShadow" size="small"></n-input-number></SettingItem>
            <SettingItem name="y"> <n-input-number v-model:value="optionData.vShadow" size="small"></n-input-number></SettingItem>
            <SettingItem name="模糊"> <n-input-number v-model:value="optionData.blurShadow" size="small"></n-input-number></SettingItem>
            <SettingItem name="颜色"> <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colorShadow"></n-color-picker></SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option, FontWeightEnum, FontWeightObject } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
const fontWeightOptions = [
    {
        label: FontWeightEnum.NORMAL,
        value: FontWeightObject[FontWeightEnum.NORMAL],
    },
    {
        label: FontWeightEnum.BOLD,
        value: FontWeightObject[FontWeightEnum.BOLD],
    },
]
</script>

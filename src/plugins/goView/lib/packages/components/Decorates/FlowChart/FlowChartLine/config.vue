<template>
    <CollapseItem name="线条" :expanded="true">
        <SettingItemBox name="折线数量">
            <SettingItem name="向下增加">
                <n-input-number size="small" :min="0" v-model:value="optionData.lineNum"></n-input-number>
            </SettingItem>
            <SettingItem name="向上增加">
                <n-input-number size="small" :min="0" v-model:value="optionData.lineNumUp"></n-input-number>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="折线样式">
            <SettingItem name="折线粗细">
                <n-input-number size="small" :min="1" v-model:value="optionData.lineWidth"></n-input-number>
            </SettingItem>
            <SettingItem name="背景条颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundCol"></n-color-picker>
            </SettingItem>
            <SettingItem name="流动颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.animateCol"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
</script>

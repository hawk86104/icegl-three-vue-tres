<template>
    <CollapseItem name="线条" :expanded="true">
        <SettingItemBox name="具体">
            <SettingItem name="外圆环半径">
                <n-input-number size="small" v-model:value="optionData.outCircle"></n-input-number>
            </SettingItem>
            <SettingItem name="内部圆形半径">
                <n-input-number size="small" v-model:value="optionData.inCircle"></n-input-number>
            </SettingItem>
            <SettingItem name="外圆环粗细">
                <n-input-number size="small" v-model:value="optionData.outCircleWidth"></n-input-number>
            </SettingItem>

            <SettingItem name="外圆环颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.outCircleColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="内部圆形颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.inCircleColor"></n-color-picker>
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

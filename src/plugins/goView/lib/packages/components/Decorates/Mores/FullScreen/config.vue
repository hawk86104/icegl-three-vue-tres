<template>
    <CollapseItem name="全屏按钮" expanded>
        <SettingItemBox name="按钮">
            <SettingItem name="背景色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.bgColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="边框色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="边框大小">
                <n-input-number v-model:value="optionData.border" size="small" :step="0.5" :min="0"></n-input-number>
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

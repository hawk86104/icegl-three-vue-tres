<template>
    <CollapseItem name="边框" :expanded="true">
        <SettingItemBox :name="`颜色-${index + 1}`" v-for="(item, index) in optionData.colors" :key="index">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colors[index]"></n-color-picker>
            </SettingItem>
            <SettingItem>
                <n-button size="small" @click="optionData.colors[index] = option.colors[index]"> 恢复默认 </n-button>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
    <CollapseItem name="动画" :expanded="true">
        <SettingItemBox name="设置">
            <SettingItem name="速度(s)">
                <n-input-number v-model:value="optionData.dur" size="small" :step="0.5" :min="0.5"></n-input-number>
            </SettingItem>
            <SettingItem>
                <n-space>
                    <n-switch size="small" v-model:value="optionData.reverse" />
                    <n-text>开启反向</n-text>
                </n-space>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
    <CollapseItem name="背景" :expanded="true">
        <SettingItemBox name="颜色">
            <SettingItem>
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundColor"></n-color-picker>
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

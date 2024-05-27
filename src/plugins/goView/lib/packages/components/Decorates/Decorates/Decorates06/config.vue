<template>
    <CollapseItem name="内容" expanded>
        <SettingItemBox name="文字" alone>
            <SettingItem>
                <n-input v-model:value="optionData.dataset" size="small"></n-input>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="样式">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.textColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="optionData.textSize" size="small" :min="12"></n-input-number>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>

    <CollapseItem name="样式" expanded>
        <SettingItemBox :name="`颜色-${index + 1}`" v-for="(item, index) in optionData.colors" :key="index">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colors[index]"></n-color-picker>
            </SettingItem>
            <SettingItem>
                <n-button size="small" @click="optionData.colors[index] = option.colors[index]"> 恢复默认 </n-button>
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

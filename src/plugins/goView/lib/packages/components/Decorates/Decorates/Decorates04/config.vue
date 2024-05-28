<template>
    <CollapseItem name="样式" :expanded="true">
        <SettingItemBox name="方向">
            <SettingItem>
                <n-space>
                    <n-switch v-model:value="optionData.reverse" size="small" />
                    <n-text>开启反向</n-text>
                </n-space>
            </SettingItem>
        </SettingItemBox>

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

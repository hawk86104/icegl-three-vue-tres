<template>
    <collapse-item name="属性" :expanded="true">
        <setting-item-box name="路径" :alone="true">
            <setting-item name="请填写 https 协议的网址">
                <n-input v-model:value="optionData.dataset" size="small"></n-input>
            </setting-item>
        </setting-item-box>
        <setting-item-box name="样式">
            <setting-item name="圆角">
                <n-input-number v-model:value="optionData.borderRadius" size="small" :min="0" placeholder="圆角"></n-input-number>
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})
</script>

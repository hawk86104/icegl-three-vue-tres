<template>
    <collapse-item name="翻牌" :expanded="true">
        <setting-item-box name="内容">
            <setting-item name="初始值">
                <n-input-number v-model:value="optionData.dataset" size="small" :min="0"></n-input-number>
            </setting-item>
            <setting-item name="翻牌个数">
                <n-input-number v-model:value="optionData.flipperLength" size="small" :min="1"></n-input-number>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="样式">
            <setting-item name="宽度">
                <n-input-number v-model:value="optionData.flipperWidth" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="高度">
                <n-input-number v-model:value="optionData.flipperHeight" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="边框">
                <n-input-number v-model:value="optionData.flipperBorderWidth" size="small" :min="0" :max="10"></n-input-number>
            </setting-item>
            <setting-item name="圆角">
                <n-input-number v-model:value="optionData.flipperRadius" size="small" :min="0"></n-input-number>
            </setting-item>
            <setting-item name="翻牌间隔">
                <n-input-number v-model:value="optionData.flipperGap" size="small" :min="0"></n-input-number>
            </setting-item>
            <setting-item />
            <setting-item name="背景色">
                <n-color-picker size="small" :show-alpha="false" :modes="['hex']" v-model:value="optionData.flipperBgColor"></n-color-picker>
            </setting-item>
            <setting-item name="字体色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.flipperTextColor"></n-color-picker>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="行为">
            <setting-item name="动画">
                <n-select
                    v-model:value="optionData.flipperType"
                    size="small"
                    :options="[
                        { label: '下翻', value: 'down' },
                        { label: '上翻', value: 'up' },
                    ]"
                ></n-select>
            </setting-item>
            <setting-item name="翻牌速度(毫秒)">
                <n-input-number v-model:value="optionData.flipperSpeed" size="small" :min="100" :max="900" :step="100"></n-input-number>
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { OptionType } from './config'

defineProps({
    optionData: {
        type: Object as PropType<OptionType>,
        required: true,
    },
})
</script>

<template>
    <collapse-item name="倒计时" expanded>
        <setting-item-box name="内容" alone>
            <setting-item name="计时(秒)">
                <n-input-number v-model:value="optionData.dataset" size="small" :min="0" :disabled="optionData.useEndDate"></n-input-number>
            </setting-item>
            <setting-item name="结束日期">
                <n-date-picker v-model:value="optionData.endDate" type="datetime" :disabled="!optionData.useEndDate" />
            </setting-item>
            <setting-item>
                <n-checkbox v-model:checked="optionData.useEndDate" size="small">使用固定结束日期</n-checkbox>
            </setting-item>
        </setting-item-box>

        <setting-item-box name="样式">
            <setting-item name="风格">
                <n-select
                    v-model:value="optionData.style"
                    size="small"
                    :options="[
                        { label: '时分秒', value: '时分秒' },
                        { label: '冒号', value: '冒号' },
                    ]"
                ></n-select>
            </setting-item>
            <setting-item>
                <n-checkbox v-model:checked="optionData.showDay" size="small">显示天</n-checkbox>
            </setting-item>
        </setting-item-box>
    </collapse-item>

    <collapse-item name="翻牌" expanded>
        <setting-item-box name="样式">
            <setting-item name="宽度">
                <n-input-number v-model:value="optionData.flipperWidth" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="高度">
                <n-input-number v-model:value="optionData.flipperHeight" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="间隔">
                <n-input-number v-model:value="optionData.flipperGap" size="small" :min="0"></n-input-number>
            </setting-item>
            <setting-item name="圆角">
                <n-input-number v-model:value="optionData.flipperRadius" size="small" :min="0"></n-input-number>
            </setting-item>
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

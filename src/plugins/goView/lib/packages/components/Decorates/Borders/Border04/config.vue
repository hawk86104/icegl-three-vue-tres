<template>
    <CollapseItem name="标题" :expanded="true">
        <SettingItemBox name="内容" :alone="true">
            <n-input size="small" v-model:value="optionData.borderTitle" :minlength="1" type="text" placeholder="请输入标题内容" />
        </SettingItemBox>

        <SettingItemBox name="样式">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderTitleColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="文字大小">
                <n-input-number size="small" v-model:value="optionData.borderTitleSize" :min="12" />
            </SettingItem>
            <SettingItem name="高度">
                <n-input-number size="small" v-model:value="optionData.borderTitleHeight" :min="24" />
            </SettingItem>
            <SettingItem name="宽度">
                <n-input-number size="small" v-model:value="optionData.borderTitleWidth" :min="50" :step="10" />
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>

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

<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`样式`" :expanded="true">
        <SettingItemBox name="线条">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.lineStyle.color.colorStops[0].color"></n-color-picker>
            </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.lineStyle.color.colorStops[1].color"></n-color-picker>
            </SettingItem>
            <SettingItem name="宽度">
                <n-input-number v-model:value="item.lineStyle.width" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
            <SettingItem name="类型">
                <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="实心点">
            <SettingItem name="大小">
                <n-input-number v-model:value="item.symbolSize" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="阴影" :alone="true">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.lineStyle.shadowColor"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="设置">
            <SettingItem name="阴影">
                <n-button size="small" @click="item.lineStyle.shadowColor = 'rgba(0, 0, 0, 0)'"> 去除阴影 </n-button>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { lineConf } from 'PLS/goView/lib/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const seriesList = computed(() => {
    return props.optionData.series
})
</script>

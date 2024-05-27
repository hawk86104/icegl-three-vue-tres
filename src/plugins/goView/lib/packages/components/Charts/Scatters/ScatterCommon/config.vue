<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>

    <CollapseItem :name="`散点-${index + 1}`" expanded v-for="(item, index) in optionData.series" :key="index">
        <SettingItemBox name="样式">
            <SettingItem name="类型">
                <n-select v-model:value="item.type" size="small" :options="ScatterEffectTypeEnumList" placeholder="选择" />
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="item.symbolSize" size="small" :min="1"></n-input-number>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="标域">
            <SettingItem name="粗细(0不显示)">
                <n-input-number v-model:value="item.markArea.itemStyle.borderWidth" size="small" :min="0"></n-input-number>
            </SettingItem>
            <SettingItem name="符号">
                <n-select v-model:value="item.markArea.itemStyle.borderType" size="small" :options="axisConfig.splitLint.lineStyle.type" placeholder="选择" />
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="标点">
            <SettingItem name="形状">
                <n-select v-model:value="item.markPoint.symbol" size="small" :options="SymbolEnumList" placeholder="选择" />
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="item.markPoint.symbolSize" size="small" :min="0"></n-input-number>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'
import { ScatterEffectTypeEnumList, SymbolEnumList } from '../shard'
import { axisConfig } from 'PLS/goView/lib/packages/chartConfiguration/echarts/index'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType & typeof option>,
        required: true,
    },
})
</script>

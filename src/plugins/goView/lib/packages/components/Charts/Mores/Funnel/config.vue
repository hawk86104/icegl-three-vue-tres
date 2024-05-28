<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"> </global-setting>
    <!-- 漏斗图 -->
    <collapse-item v-for="(item, index) in seriesList" :key="index" :name="`漏斗图`" expanded>
        <setting-item-box name="排序" alone>
            <setting-item>
                <n-select v-model:value="item.sort" :options="FunnelOrderEnumList" size="small" />
            </setting-item>
        </setting-item-box>

        <SettingItemBox name="范围" :alone="true">
            <setting-item :name="`顶部距离：${item.top}px`">
                <n-slider v-model:value="item.top" :min="0" :max="300" :format-tooltip="sliderFormatTooltip"></n-slider>
            </setting-item>
        </SettingItemBox>

        <setting-item-box name="区块">
            <setting-item name="边框大小">
                <n-input-number v-model:value="item.itemStyle.borderWidth" :min="0" :max="10" size="small" />
            </setting-item>
            <setting-item name="边框颜色">
                <n-color-picker v-model:value="item.itemStyle.borderColor" :modes="['hex']" size="small" />
            </setting-item>
            <setting-item name="间隔">
                <n-input-number v-model:value="item.gap" :min="0" :max="20" size="small" />
            </setting-item>
        </setting-item-box>

        <setting-item-box name="标签">
            <setting-item name="是否显示">
                <n-checkbox v-model:checked="item.label.show" size="small">标签</n-checkbox>
            </setting-item>
            <setting-item name="位置">
                <n-select v-model:value="item.label.position" :options="FunnelLabelPositionEnumList" size="small" />
            </setting-item>
            <setting-item name="大小">
                <n-input-number v-model:value="item.label.fontSize" :min="0" size="small" />
            </setting-item>
            <setting-item name="悬停时大小">
                <n-input-number v-model:value="item.emphasis.label.fontSize" :min="0" size="small" />
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { option, FunnelOrderEnumList, FunnelLabelPositionEnumList } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})

const seriesList = computed(() => {
    return props.optionData.series
})

const sliderFormatTooltip = (v: number) => {
    return `${v}px`
}
</script>

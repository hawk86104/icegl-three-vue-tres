<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`系列${index + 1}`" :expanded="true">
        <template #header>
            <n-text class="go-fs-13" depth="3">
                {{ item.type == 'bar' ? '「柱状图」' : '「折线图」' }}
            </n-text>
        </template>
        <SettingItemBox name="类型">
            <SettingItem name="宽度">
                <n-select
                    :value="item.type"
                    size="small"
                    :options="[
                        { label: '柱状图', value: 'bar' },
                        { label: '折线图', value: 'line' },
                    ]"
                    @update:value="(value: any) => {
            updateHandle(item, value)
          }"
                />
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="图形" v-if="item.type == 'bar'">
            <SettingItem name="宽度">
                <n-input-number v-model:value="item.barWidth" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
            <SettingItem name="圆角">
                <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="线条" v-if="item.type == 'line'">
            <SettingItem name="宽度">
                <n-input-number v-model:value="item.lineStyle.width" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
            <SettingItem name="类型">
                <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
            </SettingItem>
            <setting-item>
                <n-space>
                    <n-switch v-model:value="item.smooth" size="small" />
                    <n-text>曲线</n-text>
                </n-space>
            </setting-item>
        </SettingItemBox>
        <SettingItemBox name="实心点" v-if="item.type == 'line'">
            <SettingItem name="大小">
                <n-input-number v-model:value="item.symbolSize" :min="1" :max="100" size="small" placeholder="自动计算"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <setting-item-box name="标签">
            <setting-item>
                <n-space>
                    <n-switch v-model:value="item.label.show" size="small" />
                    <n-text>展示标签</n-text>
                </n-space>
            </setting-item>
            <setting-item name="大小">
                <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
            </setting-item>
            <setting-item name="tip颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
            </setting-item>
            <setting-item name="位置">
                <n-select
                    v-model:value="item.label.position"
                    :options="[
                        { label: '顶部', value: 'top' },
                        { label: '左侧', value: 'left' },
                        { label: '右侧', value: 'right' },
                        { label: '底部', value: 'bottom' },
                    ]"
                />
            </setting-item>
        </setting-item-box>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, toRaw } from 'vue'
import { merge, cloneDeep } from 'lodash'

import GlobalSetting from 'PLS/goView/lib/gPages/ChartItemSetting/GlobalSetting.vue'
import CollapseItem from 'PLS/goView/lib/gPages/ChartItemSetting/CollapseItem.vue'
import SettingItemBox from 'PLS/goView/lib/gPages/ChartItemSetting/SettingItemBox.vue'
import SettingItem from 'PLS/goView/lib/gPages/ChartItemSetting/SettingItem.vue'

import { lineConf } from 'PLS/goView/lib/packages/chartConfiguration/echarts'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes'
import { barSeriesItem, lineSeriesItem } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const seriesList = computed(() => {
    return props.optionData.series
})

const updateHandle = (item: any, value: string) => {
    const _label = cloneDeep(toRaw(item.label))
    lineSeriesItem.label = _label
    if (value === 'line') {
        merge(item, lineSeriesItem)
    } else {
        merge(item, barSeriesItem)
    }
}
</script>

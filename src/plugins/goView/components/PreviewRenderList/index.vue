<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 17:55:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 17:59:05
-->
<template>
    <div
        class="chart-item"
        v-for="(item, index) in chartEditStore.componentList"
        :class="animationsClass(item.styles.animations)"
        :key="item.id"
        :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any,
      ...getSizeStyle(item.attr)
    }"
    >
        <!-- 分组 -->
        <preview-render-group
            v-if="item.isGroup"
            :groupData="(item as any)"
            :groupIndex="index"
            :themeSetting="themeSetting"
            :themeColor="themeColor"
        ></preview-render-group>

        <!-- 单组件 -->
        <component
            v-else
            :is="item.chartConfig.chartKey"
            :id="item.id"
            :chartConfig="item"
            :themeSetting="themeSetting"
            :themeColor="themeColor"
            :style="{
                ...getSizeStyle(item.attr),
                ...getFilterStyle(item.styles),
            }"
            v-on="useLifeHandler(item)"
        ></component>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useChartDataPondFetch, useLifeHandler } from 'PLS/goView/lib/gHooks'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from 'PLS/goView/lib/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from 'PLS/goView/lib/utils'

// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()

// 主题色
const themeSetting = computed(() => {
    const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
    return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
    const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
    return colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
})

// 组件渲染结束初始化数据池
clearMittDataPondMap()
onMounted(() => {
    initDataPond(useChartEditStore)
})
</script>

<style lang="scss" scoped>
.chart-item {
    position: absolute;
}
</style>

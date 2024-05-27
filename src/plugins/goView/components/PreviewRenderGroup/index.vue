<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 17:55:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 18:04:17
-->
<template>
    <div
        :class="animationsClass(groupData.styles.animations)"
        :style="{
            ...getSizeStyle(groupData.attr),
            ...getFilterStyle(groupData.styles),
        }"
    >
        <div
            class="chart-item"
            v-for="item in groupData.groupList"
            :class="animationsClass(item.styles.animations)"
            :key="item.id"
            :style="{
      ...getComponentAttrStyle(item.attr, groupIndex),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any
    }"
        >
            <component
                :is="item.chartConfig.chartKey"
                :id="item.id"
                :chartConfig="item"
                :themeSetting="themeSetting"
                :themeColor="themeColor"
                :style="{
                    ...getSizeStyle(item.attr),
                    ...getFilterStyle(item.styles),
                    ...getTransformStyle(item.styles),
                }"
                v-on="useLifeHandler(item)"
            ></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle } from 'PLS/goView/lib/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from 'PLS/goView/lib/utils'
import { useLifeHandler } from 'PLS/goView/lib/gHooks'

const props = defineProps({
    groupData: {
        type: Object as PropType<any>,
        required: true,
    },
    themeSetting: {
        type: Object,
        required: true,
    },
    themeColor: {
        type: Object,
        required: true,
    },
    groupIndex: {
        type: Number,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.chart-item {
    position: absolute;
}
</style>

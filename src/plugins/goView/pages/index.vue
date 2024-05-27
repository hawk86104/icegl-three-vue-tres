<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:22:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 19:13:19
-->
<template>
    <div :class="`go-preview ${chartEditStore.editCanvasConfig.previewScaleType}`" @mousedown="dragCanvas">
        <div ref="previewRef" class="go-preview-scale">
            <div :style="previewRefStyle" v-if="show">
                <!-- 渲染层 -->
                <preview-render-list></preview-render-list>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChartEditStore } from '../stores/chartEditStore'
import { getSessionStorageInfo, dragCanvas, getEditCanvasConfigStyle } from '../lib/utils'
import { useScale } from '../lib/hooks/useScale.hook'
import { useStore } from '../lib/hooks/useStore.hook'
import { useComInstall } from '../lib/hooks/useComInstall.hook'
import { getFilterStyle } from '../lib/utils/global'

import { PreviewRenderList } from '../components/PreviewRenderList'

import naive from 'naive-ui'
window['$vue'].use(naive)

// @ts-ignore
await getSessionStorageInfo()
const chartEditStore = useChartEditStore() as any

const previewRefStyle = computed(() => {
    return {
        overflow: 'hidden',
        ...getEditCanvasConfigStyle(chartEditStore.editCanvasConfig),
        ...getFilterStyle(chartEditStore.editCanvasConfig),
    }
})

useStore(chartEditStore)
const { previewRef } = useScale(chartEditStore)
const { show } = useComInstall(chartEditStore)
</script>

<style lang="scss" scoped>
@import '../lib/scss/style.scss';
@include go('preview') {
    position: relative;
    height: 100vh;
    width: 100vw;
    @include background-image('background-image');
    &.fit,
    &.full {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .go-preview-scale {
            transform-origin: center center;
        }
    }
    &.scrollY {
        overflow-x: hidden;
        .go-preview-scale {
            transform-origin: left top;
        }
    }
    &.scrollX {
        overflow-y: hidden;
        .go-preview-scale {
            transform-origin: left top;
        }
    }
    .go-preview-entity {
        overflow: hidden;
    }
}
</style>

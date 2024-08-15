<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:22:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-15 13:12:02
-->
<template>
    <div v-show="showAllComRef" :class="`go-preview ${chartEditStore.editCanvasConfig.previewScaleType}`" style="pointer-events: none" @mousedown="dragCanvas">
        <template v-if="showEntity">
            <!-- 实体区域 -->
            <div ref="entityRef" class="go-preview-entity">
                <!-- 缩放层 -->
                <div ref="previewRef" class="go-preview-scale">
                    <!-- 展示层 -->
                    <div :style="previewRefStyle" v-if="showAllComRef && show">
                        <!-- 渲染层 -->
                        <preview-render-list></preview-render-list>
                        <!-- 遮罩层 -->
                        <div class="go-preview-mask" :style="goPreviewMaskStyle"></div>
                        <div class="go-preview-mask mask-right" :style="goPreviewMaskStyle"></div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div ref="previewRef" class="go-preview-scale">
                <div :style="previewRefStyle" v-if="showAllComRef && show">
                    <!-- 渲染层 -->
                    <preview-render-list></preview-render-list>
                    <!-- 遮罩层 -->
                    <div class="go-preview-mask" :style="goPreviewMaskStyle"></div>
                    <div class="go-preview-mask mask-right" :style="goPreviewMaskStyle"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useChartEditStore } from '../stores/chartEditStore'
import { getSessionStorageInfo, dragCanvas, getEditCanvasConfigStyle } from '../lib/utils'
import { useScale } from '../lib/hooks/useScale.hook'
import { useStore } from '../lib/hooks/useStore.hook'
import { useComInstall } from '../lib/hooks/useComInstall.hook'
import { getFilterStyle } from '../lib/utils/global'
import { PreviewScaleEnum } from 'PLS/goView/lib/enums/styleEnum'
import { PreviewRenderList } from '../components/PreviewRenderList'

const props = withDefaults(
    defineProps<{
        dataJson: any // 图表数据 goview配置文件
        showAllCom?: boolean // 是否 显示所有组件 可接入全局等待loading结果
        delay?: number // 延迟显示时间 单位毫秒 用于在three中读取完模型后 载入的延迟配置
        maskWidth?: number // 遮罩层宽度 默认500px
    }>(),
    {
        showAllCom: true,
        delay: 0,
        maskWidth: 500,
    },
)

import naive from 'naive-ui'
window['$vue'].use(naive)

getSessionStorageInfo(props.dataJson)
const chartEditStore = useChartEditStore() as any

const previewRefStyle = computed(() => {
    return {
        overflow: 'hidden',
        ...getEditCanvasConfigStyle(chartEditStore.editCanvasConfig),
        ...getFilterStyle(chartEditStore.editCanvasConfig),
    }
})
const showEntity = computed(() => {
    const type = chartEditStore.editCanvasConfig.previewScaleType
    return type === PreviewScaleEnum.SCROLL_Y || type === PreviewScaleEnum.SCROLL_X
})

useStore(chartEditStore)

const { entityRef, previewRef } = useScale(chartEditStore)
const { show } = useComInstall(chartEditStore)

const showAllComRef = ref(false)
watch(
    () => props.showAllCom,
    (newValue) => {
        if (newValue) {
            setTimeout(() => {
                if (props.showAllCom) {
                    showAllComRef.value = true
                }
            }, props.delay)
        }
    },
    { immediate: true },
)

const goPreviewMaskStyle = computed(() => ({
    width: `${props.maskWidth}px`,
}))
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

    .go-preview-mask {
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0));
        &.mask-right {
            background: linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0));
            right: 0;
            position: absolute;
            top: 0;
        }
    }
}
</style>
<style lang="less">
.go-preview {
    .chart-item {
        pointer-events: all;
    }
}
</style>

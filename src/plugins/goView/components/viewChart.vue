<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:22:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-12 10:24:01
-->
<template>
    <n-config-provider :theme="darkTheme" :hljs="hljsTheme" :locale="locale" :date-locale="dateLocale" :theme-overrides="overridesTheme">
        <div
            v-show="showAllComRef"
            :class="`go-preview ${chartEditStore.editCanvasConfig.previewScaleType}`"
            style="pointer-events: none"
            @mousedown="dragCanvas"
        >
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
                            <div class="go-preview-top" :style="goPreviewMaskStyleTop"></div>
                            <div class="go-preview-mask" :style="goPreviewMaskStyle"></div>
                            <div class="go-preview-mask mask-right" :style="goPreviewMaskStyleRight"></div>
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
                        <div class="go-preview-top" :style="goPreviewMaskStyleTop"></div>
                        <div class="go-preview-mask" :style="goPreviewMaskStyle"></div>
                        <div class="go-preview-mask mask-right" :style="goPreviewMaskStyleRight"></div>
                    </div>
                </div>
            </template>
        </div>
    </n-config-provider>
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
import { NConfigProvider } from 'naive-ui'
import { useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from 'PLS/goView/lib/gHooks/'
// 暗黑主题
const darkTheme = useDarkThemeHook()
// 主题配置
const overridesTheme = useThemeOverridesHook()
// 代码主题
const hljsTheme = useCode()
// 全局语言
const { locale, dateLocale } = useLang()

const props = withDefaults(
    defineProps<{
        dataJson: any // 图表数据 goview配置文件
        showAllCom?: boolean // 是否 显示所有组件 可接入全局等待loading结果
        delay?: number // 延迟显示时间 单位毫秒 用于在three中读取完模型后 载入的延迟配置
        maskWidth?: number // 遮罩层宽度 默认500px
        maskRightWidth?: number // 右遮罩层宽度 默认-1时 使用maskWidth的宽度
        maskHeight?: number // 遮罩层高度 默认0px
        maskColor?: string // 遮罩层颜色 默认#000000
    }>(),
    {
        showAllCom: true,
        delay: 0,
        maskWidth: 500,
        maskRightWidth: -1,
        maskHeight: 0,
        maskColor: '#000000',
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
    background: `linear-gradient(
    to right,
    ${props.maskColor}90,
    ${props.maskColor}60 80%,
    rgba(0, 0, 0, 0)
  )`,
}))

const goPreviewMaskStyleRight = computed(() => ({
    width: `${props.maskRightWidth === -1 ? props.maskWidth : props.maskRightWidth}px`,
    background: `linear-gradient(
    to left,
    ${props.maskColor}90,
    ${props.maskColor}60 80%,
    rgba(0, 0, 0, 0)
  )`,
}))
const goPreviewMaskStyleTop = computed(() => ({
    height: `${props.maskHeight}px`,
    background: `linear-gradient(
    to bottom,
    ${props.maskColor}90,
    ${props.maskColor}60 80%,
    rgba(0, 0, 0, 0)
  )`,
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
        &.mask-right {
            right: 0;
            position: absolute;
            top: 0;
        }
    }
    .go-preview-top {
        width: 100%;
        position: absolute;
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

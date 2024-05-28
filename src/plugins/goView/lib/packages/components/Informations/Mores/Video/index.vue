<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- 重要：需要设置 crossOrigin="anonymous"，否则保存画板缩略图会失败 -->
    <video
        ref="vVideoRef"
        class="go-video"
        preload="auto"
        crossOrigin="anonymous"
        playsinline
        autoplay
        :loop="option.loop"
        :muted="option.muted"
        :width="w"
        :height="h"
        :src="option.dataset"
    ></video>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const { w, h } = toRefs(props.chartConfig.attr)
let option = shallowReactive({ ...configOption })

// 预览更新
const vVideoRef = ref(null)
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    option.dataset = newData
})

// 编辑更新
watch(
    () => props.chartConfig.option,
    (newData: any) => {
        option = newData
        if (!vVideoRef.value) return
        const video: any = vVideoRef.value
        video.loop = option.loop
        video.muted = option.muted
        video.play()
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

<style lang="scss" scoped>
@include go('video') {
    display: block;
    object-fit: v-bind('option.fit');
}
</style>

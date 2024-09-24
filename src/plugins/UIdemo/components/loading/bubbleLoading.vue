<!--
 * @Description: https://juejin.cn/post/7221320687430942781
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 15:00:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-24 18:33:28
-->
<template>
    <div v-if="!hasFinishLoading" class="absolute bg-grey-600 t-0 l-0 w-full h-full z-99999999 flex justify-center items-center text-black font-mono bg-black">
        <div class="text-white">
            <div class="g-container">
                <div class="g-circle"></div>
                <ul class="g-bubbles">
                    <li v-for="index in 200" :key="index" class="g-bubble" />
                </ul>
            </div>
            <span class="pspan" v-if="showProgress">{{ progress }} %</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hasPlugin } from '@/common/utils'
import { useProgress } from '@tresjs/cientos'

const props = withDefaults(
    defineProps<{
        isDemo?: boolean
        showProgress?: boolean
        useResourceManager?: boolean
    }>(),
    {
        isDemo: false,
        showProgress: true,
        useResourceManager: false,
    },
)

let progress = null as any
let hasFinishLoading = null as any

if (props.useResourceManager) {
    if (hasPlugin('resourceManager', '资源管理器插件')) {
        const modules = import.meta.glob('/src/plugins/resourceManager/index.js')
        const { Resource } = await modules['/src/plugins/resourceManager/index.js']()
        progress = Resource.progress
        hasFinishLoading = Resource.hasAllFinished
    }
} else {
    const uP = await useProgress()
    progress = uP.progress
    hasFinishLoading = uP.hasFinishLoading
}

const animloop = () => {
    if (progress.value++ > 100) {
        progress.value = 0
    }
    requestAnimationFrame(animloop)
}
if (props.isDemo) {
    requestAnimationFrame(animloop)
}
</script>

<style lang="scss" scoped>
@import './bubbleLoading.scss';

.pspan {
    position: absolute;
    top: 50%;
    left: calc(50% - 1em);
    font-size: 20px;
}
</style>

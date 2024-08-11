<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 17:14:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-11 18:46:05
-->
<template>
    <div v-if="!hasFinishLoading" class="absolute bg-grey-600 t-0 l-0 w-full h-full z-99999999 flex justify-center items-center text-black font-mono bg-black">
        <div class="text-white">
            <div class="loader">
                <svg viewBox="0 0 800 600" xml:space="preserve">
                    <symbol id="single">
                        <path
                            d="M357.5,211.693c0,35.741,16.598,67.6,42.5,88.307
		c25.902-20.707,42.5-52.566,42.5-88.307s-16.598-67.6-42.5-88.307C374.098,144.094,357.5,175.953,357.5,211.693z"
                        />
                    </symbol>
                    <g id="leaf">
                        <use class="flo" v-for="index in 36" :key="index" xlink:href="#single" />
                    </g>
                </svg>
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
    if (hasPlugin('resourceManager')) {
        const modules = import.meta.glob('PLS/resourceManager/index.js')
        const { Resource } = await modules['/src/plugins/resourceManager/index.js']()
        progress = Resource.progress
        hasFinishLoading = Resource.hasAllFinished
    }else{
        console.error('resourceManager插件未安装，请到插件市场安装:https://icegl.cn/tvtstore')
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
@import './yangyangLoading.scss';

.loader {
    width: 400px;
}

.pspan {
    text-align: center;
    width: 100%;
    display: block;
    margin-top: -50px;
}
</style>

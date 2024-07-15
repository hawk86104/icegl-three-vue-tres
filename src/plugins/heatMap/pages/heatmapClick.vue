<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-15 17:46:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-15 20:56:17
-->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import { reactive } from 'vue'
import heatmapClickCom from '../components/heatmapClickCom.vue'

const gl = {
    clearColor: '#030311',
    shadows: true,
    alpha: true,
    outputColorSpace: SRGBColorSpace,
    shadowMapType: PCFSoftShadowMap,
    useLegacyLights: true,
    antialias: true,
}

const typeState = reactive({
    show2dCanvas: true,
    radius: 20,
})
const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(typeState, 'show2dCanvas', {
    label: '显示二维图',
})
paneControl.addBinding(typeState, 'radius', {
    label: '圆圈的大小',
    min: 0.1,
    max: 30,
    step: 0.1,
})
paneControl.addButton({ title: '点击左侧蓝色画框' })
</script>

<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[21, 34, 55]" :fov="60" :near="1" :far="100000" />
        <OrbitControls :autoRotate="false" :autoRotateSpeed="2" />
        <TresDirectionalLight :position="[5, 10, 7.5]" color="#ffffff" :intensity="5" />
        <TresGridHelper :args="[50, 25]" />
        <Suspense>
            <heatmapClickCom v-bind="typeState" />
        </Suspense>
    </TresCanvas>
</template>

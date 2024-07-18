<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 11:16:40
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[-4, 5, 4]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
            <device v-bind="deviceState" />
        </Suspense>
        <Suspense>
            <reflectorShaderMesh v-bind="configState" :position="[0, 0, 0]" />
        </Suspense>

        <divContent />
        <useHtmlComChart :position="[-0.5, -0.001, 2.25]" :rotation="[-Math.PI / 2, 0, -Math.PI / 2]" />
        <!-- <divChart :position="[-0.5, -0.001, 1.75]" :rotation="[-Math.PI / 2, 0, -Math.PI / 2]" /> -->
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import divContent from 'PLS/industry4/components/divContent.vue'
// import divChart from 'PLS/industry4/components/divChart.vue'
import useHtmlComChart from 'PLS/industry4/components/useHtmlComChart.vue'
import device from '../components/device.vue'

const configState = reactive({
    reflectivity: 0.1,
    mirror: 0.92, // 去除纹理 镜面化
    mixStrength: 36,
    showGridHelper: false,
})

const state = reactive({
    clearColor: '#000',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
    renderMode: 'manual',
})
const controlsState = reactive({
    autoRotate: true,
})

const deviceState = reactive({
    threshold: 0.37, // 阈值
    strength: 1.6, // 强度
    radius: 0.1, // 半径
})
</script>

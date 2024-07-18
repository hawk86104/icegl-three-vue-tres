<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 11:16:21
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" intensity="40" />
        <TresDirectionalLight :position="[0, 2, -4]" :intensity="1" />
        <Suspense>
            <device v-bind="deviceState" />
        </Suspense>
        <TresGridHelper :position="[0, -1, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { randomLoading as loading } from 'PLS/UIdemo'
import device from '../components/device.vue'

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
    threshold: 0, // 阈值
    strength: 0.6, // 强度
    radius: 0.21, // 半径
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(deviceState, 'threshold', {
    label: '阈值',
    min: 0,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(deviceState, 'strength', {
    label: '强度',
    min: 0,
    max: 3,
    step: 0.2,
})
paneControl.addBinding(deviceState, 'radius', {
    label: '半径',
    min: 0,
    max: 1,
    step: 0.1,
})
</script>

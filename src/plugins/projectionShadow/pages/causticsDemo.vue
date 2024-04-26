<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 15:33:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-26 11:20:17
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[-20, 20, 15]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" />

        <Caustics v-bind="causticsState">
            <TresMesh :position="[8, 5.5, 8.5]" receive-shadow cast-shadow name="sphere">
                <TresSphereGeometry :args="[3.5]" />
                <TresMeshStandardMaterial :color="0xff33ff" :roughness="0" :metalness="1" />
            </TresMesh>
            <TresMesh ref="torusMesh" :position="[-8, 6, -8]" name="torus">
                <TresTorusKnotGeometry :args="[3, 1, 100, 32]" />
                <TresMeshPhysicalMaterial color="#33ffff" :transmission="1" :roughness="0" :thickness="2" />
            </TresMesh>
        </Caustics>

        <Suspense>
            <groundProjectedEnv :position="[0, -0.1, 0]" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { groundProjectedEnv } from 'PLS/skyBox'
import { Pane } from 'tweakpane'

import { Caustics } from 'PLS/basic'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x999999,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})
const torusMesh = ref(null)
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ elapsed }) => {
    if (torusMesh.value) {
        torusMesh.value.rotation.x = elapsed
        torusMesh.value.rotation.y = elapsed
    }
})

const causticsState = reactive({
    color: '#ffffff',
    ior: 1.1,
    backsideIOR: 1.1,
    far: 30,
    worldRadius: 0.3,
    intensity: 0.05,
    causticsOnly: false,
    lightSource: { x: 1, y: 1, z: 1 },
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(causticsState, 'color', {
    label: '颜色',
})
paneControl.addBinding(causticsState, 'ior', {
    label: '折射系数',
    min: 0.6,
    max: 1.3,
    step: 0.01,
})
paneControl.addBinding(causticsState, 'backsideIOR', {
    label: '折射系数2',
    min: 0.6,
    max: 1.3,
    step: 0.01,
})
paneControl.addBinding(causticsState, 'far', {
    label: '可视距离',
    min: 0,
    max: 30,
    step: 1,
})
paneControl.addBinding(causticsState, 'worldRadius', {
    label: '材质大小',
    min: 0.001,
    max: 0.5,
    step: 0.001,
})
paneControl.addBinding(causticsState, 'intensity', {
    label: '强度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(causticsState, 'causticsOnly', {
    label: '只显示投射',
})
paneControl.addBinding(causticsState, 'lightSource', {
    label: '光源位置',
    x: { min: -1, max: 1 },
    y: { min: -1, max: 1 },
    z: { min: -1, max: 1 },
})
</script>

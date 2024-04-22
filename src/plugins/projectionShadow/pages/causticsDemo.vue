<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[-20, 20, 15]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" />

        <causticsTorusMesh v-bind="causticsState" />

        <Suspense>
            <groundProjectedEnv :position="[0, -0.1, 0]" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { groundProjectedEnv } from 'PLS/skyBox'
import { Pane } from 'tweakpane'

import causticsTorusMesh from '../components/causticsTorusMesh.vue'

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

const causticsState = reactive({
    color: '#ffffff',
    ior: 1.1,
    backsideIOR: 1.1,
    far: 15,
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
    max: 15,
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

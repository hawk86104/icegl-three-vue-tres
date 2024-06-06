<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-06 08:56:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-06 11:11:28
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <customWaterMesh v-bind="customWaterState" />

        <gridPlus :args="[3, 3]" v-bind="gridState" :position="[0, -0.5, 0]" />
        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment } from 'PLS/basic'
import { gridPlus } from 'PLS/floor'
import customWaterMesh from '../components/customWaterMesh.vue'
import { Pane } from 'tweakpane'

const state = reactive({
    alpha: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x999999,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const gridState = reactive({
    cellSize: 0.6,
    cellThickness: 1.1,
    cellColor: '#627179',
    sectionColor: '#3a78a2',
    sectionSize: 2.4,
    sectionThickness: 1.8,
    fadeDistance: 27,
    fadeStrength: 0.76,
    followCamera: false,
    infiniteGrid: true,
})

const customWaterState = reactive({
    height: 0.2,
    Flatshading: false,
    waterColor: '#52a7f7',
    waterHighlight: '#b3ffff',
    brightness: 1,
    baseMaterial: 'MeshPhysicalMaterial',
})

const paneControl = new Pane()
paneControl.addBinding(customWaterState, 'height', {
    label: '高度',
    min: 0.1,
    max: 5,
    step: 0.1,
})
paneControl.addBinding(customWaterState, 'waterColor', {
    label: '水体颜色',
})
paneControl.addBinding(customWaterState, 'waterHighlight', {
    label: '浪头颜色',
})
paneControl.addBinding(customWaterState, 'brightness', {
    label: '亮度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(customWaterState, 'Flatshading', {
    label: 'Flatshading',
})
paneControl.addBlade({
    view: 'list',
    label: '材质',
    options: [
        { text: 'MeshPhysicalMaterial', value: 'MeshPhysicalMaterial' },
        { text: 'MeshBasicMaterial', value: 'MeshBasicMaterial' },
        { text: 'MeshNormalMaterial', value: 'MeshNormalMaterial' },
        { text: 'MeshStandardMaterial', value: 'MeshStandardMaterial' },
        { text: 'MeshPhongMaterial', value: 'MeshPhongMaterial' },
        { text: 'MeshToonMaterial', value: 'MeshToonMaterial' },
        { text: 'MeshLambertMaterial', value: 'MeshLambertMaterial' },
        { text: 'MeshDepthMaterial', value: 'MeshDepthMaterial' },
    ],
    value: customWaterState.baseMaterial,
})
paneControl.on('change', (e: any) => {
    if (e.target.key === 'baseMaterial') {
        customWaterState.baseMaterial = e.value
    }
})
</script>

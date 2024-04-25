<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 08:27:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-25 08:58:10
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 2, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <gridPlusCom :args="[3, 3]" v-bind="gridState" />
        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { Environment } from 'PLS/basic'
import gridPlusCom from '../components/gridPlusCom.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x666666,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const gridState = reactive({
    cellSize: 0.6,
    cellThickness: 1,
    cellColor: '#6f6f6f',
    sectionColor: '#9d4b4b',
    sectionSize: 3.3,
    sectionThickness: 1.5,
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
})

const paneControl = new Pane()
paneControl.addBinding(gridState, 'cellColor', {
    label: '小格子颜色',
})
paneControl.addBinding(gridState, 'cellSize', {
    label: '小格子大小',
    min: 0.01,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(gridState, 'cellThickness', {
    label: '小格子粗细',
    min: 0,
    max: 5,
    step: 0.1,
})
paneControl.addBinding(gridState, 'sectionColor', {
    label: '大网格颜色',
})
paneControl.addBinding(gridState, 'sectionSize', {
    label: '大网格大小',
    min: 0.01,
    max: 5,
    step: 0.01,
})
paneControl.addBinding(gridState, 'sectionThickness', {
    label: '大网格粗细',
    min: 0,
    max: 5,
    step: 0.1,
})
paneControl.addBinding(gridState, 'fadeDistance', {
    label: '边缘渐隐距离',
    min: 0,
    max: 50,
    step: 1,
})
paneControl.addBinding(gridState, 'fadeStrength', {
    label: '边缘渐隐强度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(gridState, 'followCamera', {
    label: '跟随相机',
})
paneControl.addBinding(gridState, 'infiniteGrid', {
    label: '无限网格',
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 15:54:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-27 11:28:28
-->
<template>
    <TresCanvas clearColor="#666666" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping autoRotate />
        <TresAmbientLight :intensity="1.0" />
        <TresPointLight color="#0000ff" :position="[0, 0, -3]" :intensity="100" />
        <Suspense>
            <hexGridMesh v-bind="configState" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import hexGridMesh from '../components/hexGridMesh.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: false,
    scale: 1,
})
const configState = reactive({
    color: '#de62f2',
    speed: 1.2,
    gridWeight: 0.03,
    raisedBottom: 0.05,
    waveFrequency: 0.2,
    wavePow: 4.0,
    division: 32.0,
    divisionScaleX: 1.0,
    isReversed: false,
    direction: 4,
})

const paneControl = new Pane({
    title: 'digitalGround',
    expanded: true,
})
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'speed', {
    label: '速度',
    min: -5.0,
    max: 5.0,
    step: 0.1,
})
paneControl.addBinding(configState, 'gridWeight', {
    label: '网格宽度',
    min: 0.001,
    max: 0.5,
    step: 0.001,
})
paneControl.addBinding(configState, 'raisedBottom', {
    label: '渐变宽度',
    min: 0.001,
    max: 1,
    step: 0.001,
})
paneControl.addBinding(configState, 'waveFrequency', {
    label: '分段',
    min: 0.01,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(configState, 'wavePow', {
    label: '渐变强度',
    min: 0.1,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(configState, 'division', {
    label: '网格整体缩放',
    min: 0.1,
    max: 50,
    step: 0.1,
})
paneControl.addBinding(configState, 'divisionScaleX', {
    label: '网格横向缩放',
    min: 0.1,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(configState, 'isReversed', {
    label: '颜色取反',
})
paneControl.addBinding(configState, 'direction', {
    label: '方向类别',
    min: 3,
    max: 5,
    step: 1,
})
</script>

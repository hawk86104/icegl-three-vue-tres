<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-24 17:08:56
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-24 18:21:47
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[6, 6, 6]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[7, 10, -5.5]" :intensity="5" />

        <TresMesh :position="[0, 0.9, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <ClearcoatMaterial v-bind="clearcoatState" />
        </TresMesh>

        <TresMesh :position="[-2.5, 0.5, 2.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[1.5, 1.5, 2]" />
            <TresMeshStandardMaterial :color="0xff6622" :roughness="0" :metalness="0" />
        </TresMesh>
        <Suspense>
            <Environment :resolution="256" :blur="1" background>
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[2 * 4 - (3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[-(3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[-1, 0, 0]" :scale="[10, 0.2, 1]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[1, 0, 0]" :scale="[10, 0.2, 1]" />
            </Environment>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import { ClearcoatMaterial } from 'PLS/basic'
import { Pane } from 'tweakpane'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x000000,
})
const controlsState = reactive({
    enableDamping: true,
})

const clearcoatState = reactive({
    color: '#ff00fc',
    metalness: 1,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const paneControl = new Pane()
paneControl.addBinding(clearcoatState, 'color', {
    label: '颜色',
})
paneControl.addBinding(clearcoatState, 'metalness', {
    label: 'metalness',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(clearcoatState, 'roughness', {
    label: 'roughness',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(clearcoatState, 'clearcoat', {
    label: 'clearcoat',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(clearcoatState, 'clearcoatRoughness', {
    label: 'clearcoatRoughness',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>

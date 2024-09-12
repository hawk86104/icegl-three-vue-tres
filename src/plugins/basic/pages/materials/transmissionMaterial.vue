<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 10:54:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 09:36:29
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 1.9, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TransmissionMaterial v-bind="materialState" />
        </TresMesh>

        <TresMesh :position="[-2.5, 1.5, 2.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[1.5, 1.5, 2]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <gridPlus :args="[3, 3]" />

        <Suspense>
            <Environment
                :blur="0.3"
                background
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
import { OrbitControls, Environment } from '@tresjs/cientos'
import { TransmissionMaterial } from 'PLS/basic'
import { gridPlus } from 'PLS/floor'
import { Pane } from 'tweakpane'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x000000,
    disableRender: false,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const materialState = reactive({
    color: '#ffffff',
    roughness: 0,
    reflectivity: 0.5,
    attenuationColor: '#ffffff',
    attenuationDistance: 2,
    chromaticAberration: 0.05,
    anisotropicBlur: 0.1,
    distortion: 0,
    temporalDistortion: 0,
    backside: true,
    thickness: 1,
    backsideThickness: 0.5,
})

const paneControl = new Pane()
paneControl.addBinding(materialState, 'color', {
    label: '颜色',
})
paneControl.addBinding(materialState, 'roughness', {
    label: 'roughness',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'reflectivity', {
    label: 'reflectivity',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'attenuationColor', {
    label: 'attenuationColor',
})
paneControl.addBinding(materialState, 'attenuationDistance', {
    label: 'attenuationDistance',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(materialState, 'chromaticAberration', {
    label: 'chromaticAberration',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(materialState, 'anisotropicBlur', {
    label: 'anisotropicBlur',
    min: 0,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(materialState, 'distortion', {
    label: 'distortion',
    min: 0,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(materialState, 'temporalDistortion', {
    label: 'temporalDistortion',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'backside', {
    label: 'backside',
})
paneControl.addBinding(materialState, 'thickness', {
    label: 'thickness',
    min: 0,
    max: 4,
    step: 0.01,
})
paneControl.addBinding(materialState, 'backsideThickness', {
    label: 'backsideThickness',
    min: 0,
    max: 4,
    step: 0.01,
})
</script>

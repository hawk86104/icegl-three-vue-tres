<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 10:54:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-25 17:02:07
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 1.9, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <TresMesh :position="[-2.5, 1.5, 2.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[1.5, 1.5, 2]" />
            <TransmissionMaterial />
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
import { OrbitControls } from '@tresjs/cientos'
import { Environment, TransmissionMaterial } from 'PLS/basic'
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

const outlineState = reactive({
    color: '#ff00ae',
    thickness: 0.1,
    screenspace: false,
})

const paneControl = new Pane()
paneControl.addBinding(outlineState, 'color', {
    label: '颜色',
})
paneControl.addBinding(outlineState, 'thickness', {
    label: 'thickness',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(outlineState, 'screenspace', {
    label: 'space',
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-18 10:22:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-19 11:26:28
-->
<template>
    <TresCanvas v-bind="state" ref="tcRef" window-size>
        <TresPerspectiveCamera :position="[2, 3, 4]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />

        <TresMesh :position="[2, 0.5, -1.5]" receive-shadow cast-shadow name="sphere">
            <TresSphereGeometry :args="[0.5]" />
            <TresMeshStandardMaterial :color="0xff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <TresMesh :position="[-1.5, 0.5, 1.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[0.5, 0.5, 1]" />
            <TresMeshStandardMaterial :color="0x33ffff" :roughness="0" :metalness="0" />
        </TresMesh>

        <TresMesh :position="[0, 0.9, 0]" receive-shadow cast-shadow name="torus">
            <TresTorusKnotGeometry :args="[0.5, 0.2, 80, 64]" />
            <TresMeshStandardMaterial :color="0xffff33" :roughness="0.3" :metalness="0.5" />
        </TresMesh>

        <accumulativeShadowsCom v-bind="shadowState" />

        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping, Color } from 'three'
import { reactive, watchEffect, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment } from 'PLS/basic'
import { Pane } from 'tweakpane'
import accumulativeShadowsCom from '../components/accumulativeShadowsCom.vue'

const state = reactive({
    alpha: true,
    shadows: true,
    shadowMap: true,
    toneMapping: ACESFilmicToneMapping,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})
const tcRef = shallowRef()
watchEffect(() => {
    if (tcRef.value) {
        const scene = tcRef.value.context.scene.value
        scene.background = new Color('grey')
    }
})
const shadowState = reactive({
    opacity: 0.8,
    alphaTest: 0.9,
    color: '#000000',
    blend: 2,
    lightPosition: { x: 3, y: 5, z: 3 },
    frames: 60,
    blendWindow: 100,
    ambient: 0.5,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(shadowState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(shadowState, 'alphaTest', {
    label: '透明检测',
    min: 0,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(shadowState, 'color', {
    label: '颜色',
})
paneControl.addBinding(shadowState, 'blend', {
    label: '颜色混合',
    min: 0,
    max: 3,
    step: 0.1,
})
paneControl.addBinding(shadowState, 'lightPosition', {
    label: '光源位置',
    x: { min: -5, max: 5 },
    y: { min: 1, max: 5 },
    z: { min: -5, max: 5 },
})
paneControl.addBinding(shadowState, 'frames', {
    label: '渲染帧数',
    min: 1,
    max: 100,
    step: 1,
})
paneControl.addBinding(shadowState, 'blendWindow', {
    label: 'blend',
    min: 1,
    max: 100,
    step: 1,
})
paneControl.addBinding(shadowState, 'ambient', {
    label: 'ambient',
    min: 0,
    max: 1,
    step: 0.1,
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-23 07:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-25 09:33:33
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 10, 15]" :fov="25" :near="0.1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresHemisphereLight :intensity="0.5" />

        <Suspense>
            <dissolveEffectModel v-bind="frjState" ref="dissolveEffectModelRef" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -1.562, 0]" :reflectivity="2.6" :showGridHelper="false" :scale="1.5" />
        </Suspense>

        <TresMesh :scale="4" :position="[3, -1.161, -1.5]" :rotation="[-Math.PI / 2, 0, Math.PI / 2.5]">
            <TresRingGeometry :args="[0.9, 1, 4, 1]" />
            <TresMeshStandardMaterial color="white" :roughness="0.75" :side="THREE.DoubleSide" />
        </TresMesh>
        <TresMesh :scale="4" :position="[-3, -1.161, -1]" :rotation="[-Math.PI / 2, 0, Math.PI / 2.5]">
            <TresRingGeometry :args="[0.9, 1, 3, 1]" />
            <TresMeshStandardMaterial color="white" :roughness="0.75" :side="THREE.DoubleSide" />
        </TresMesh>

        <Suspense>
            <Environment :resolution="512">
                <Lightformer :intensity="2" :position="[0, 1, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 0]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 9]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-y="Math.PI / 2" :position="[-50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer form="ring" color="red" :intensity="10" :scale="2" :position="[10, 5, 10]" />
            </Environment>
        </Suspense>

        <lamboEffect />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import * as THREE from 'three'
import { bubbleLoading as loading } from 'PLS/UIdemo'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import lamboEffect from '../components/lamboEffect.vue'
import dissolveEffectModel from '../components/dissolveEffectModel.vue'

const state = reactive({
    clearColor: '#15151a',
    antialias: false,
    logarithmicDepthBuffer: true,
    renderMode: 'manual',
})
const controlsState = reactive({
    autoRotate: true,
})

const paneControl = new Pane({
    title: '溶解参数',
    expanded: true,
})

const frjState = reactive({
    edgeColor: '#111111',
    edgeWidth: 0.03,
    dissolveSpeed: 0.003,
    funRef: {
        appear: null,
        disappear: null,
    },
})
paneControl.addBinding(frjState, 'edgeColor', {
    label: '颜色',
})
paneControl.addBinding(frjState, 'edgeWidth', {
    label: '宽度',
    min: 0,
    max: 0.13,
    step: 0.01,
})
paneControl.addBinding(frjState, 'dissolveSpeed', {
    label: '速度',
    min: 0.001,
    max: 0.01,
    step: 0.001,
})
const btn1 = paneControl.addButton({
    title: '显示',
    label: '模型',
})
const dissolveEffectModelRef = ref(null)
btn1.on('click', () => {
    //@ts-ignore
    if (dissolveEffectModelRef.value.appear) dissolveEffectModelRef.value.appear()
    //@ts-ignore
    else dissolveEffectModelRef.value.funRef.appear()
})
const btn2 = paneControl.addButton({
    title: '消失',
    label: '模型',
})
btn2.on('click', () => {
    //@ts-ignore
    if (dissolveEffectModelRef.value.appear) dissolveEffectModelRef.value.disappear()
    //@ts-ignore
    else dissolveEffectModelRef.value.funRef.disappear()
})
</script>

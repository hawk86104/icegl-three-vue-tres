<!--
 * @Description: 此方法的缺陷是 Mesh移动到摄像头偏远处 物体产生变形，而本身精灵不会。 解决方法 Mesh也换成 Sprite 后 用shader画圆可解决
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-12 11:41:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-17 16:01:46
-->
<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <TresGridHelper :args="[10, 10]" />

        <TresMesh ref="TresMeshRefA" :position="[-2, 1, 0]">
            <TresSphereGeometry :args="[1, 32, 16]" />
            <TresMeshBasicMaterial :map="pTexture[0]" />
        </TresMesh>
        <shineShader :srcMesh="TresMeshRefA" v-bind="shineState" />

        <Box ref="TreBoxRef" :args="[1, 1, 1]" :position="[2, 1, 0]">
            <TresMeshBasicMaterial :map="pTexture[1]" />
        </Box>
        <shineShader v-if="TreBoxRef && TreBoxRef.instance" :srcMesh="TreBoxRef.instance" v-bind="shineState" />

        <TresMesh ref="TresMeshRefB" :position="[0, 1, -2]">
            <TresBoxGeometry :args="[1, 1, 1, 1, 1]" />
            <TresMeshBasicMaterial color="#0ff" />
        </TresMesh>
        <shineShader :srcMesh="TresMeshRefB" v-bind="shineState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { OrbitControls, Box } from '@tresjs/cientos'
import * as THREE from 'three'
import { reactive, ref } from 'vue'
import { Pane } from 'tweakpane'
import shineShader from '../../components/shineShader.vue'

const gl = {
    clearColor: '#222',
}
const TresMeshRefA = ref()
const TresMeshRefB = ref()
const TreBoxRef = ref()
// const { map: pTexture } = await useTexture({ map: './plugins/earthSample/image/earthA/earth.jpg' })
const pTexture = await useTexture(['./plugins/earthSample/image/earthA/earth.jpg', 'logo.png'])
const shineState = reactive({
    scale: 1.6,
    color: '#00dfff',
    subdivision: true,
    c: 1.1,
    p: 1.4,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
})
const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(shineState, 'color', {
    label: '颜色',
})
paneControl.addBinding(shineState, 'scale', {
    label: '大小',
    min: 1,
    max: 3,
    step: 0.2,
})
paneControl.addBinding(shineState, 'subdivision', {
    label: '边缘处理',
})
paneControl.addBinding(shineState, 'c', {
    label: 'c',
    min: 0,
    max: 2,
    step: 0.1,
})
paneControl.addBinding(shineState, 'p', {
    label: 'p',
    min: 0,
    max: 8,
    step: 0.2,
})
paneControl.addBinding(shineState, 'side', {
    options: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
})
paneControl.addBinding(shineState, 'blending', {
    options: {
        AdditiveBlending: THREE.AdditiveBlending,
        NormalBlending: THREE.NormalBlending,
    },
})
</script>

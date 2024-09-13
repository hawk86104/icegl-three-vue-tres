<!--
 * @Descripttion: 光线追踪实例，想学习每行代码的逻辑，请联系ICE社区-Jsonco 希望使用注明出处
 * @version: 
 * @Author: Jsonco
 * @Date: 2024-09-13 20:27:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2024-09-13 21:21:22
-->

<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[0, 0, 1800]" :fov="45" :near="1" :far="10000" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <TresMesh ref="quanMeshRef" :rotation-x="Math.PI">
            <TresPlaneGeometry :args="[4000, 4000]" />
            <TresShaderMaterial v-bind="Material"></TresShaderMaterial>
        </TresMesh>
    </TresCanvas>
</template>

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core' //useRenderLoop
import { OrbitControls } from '@tresjs/cientos'
import { AdditiveBlending, DoubleSide } from 'three'
import stringVertex from '../shaders/argestCircle.vert?raw'
import stringFrag from '../shaders/superTunnel.frag?raw'

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
}
const controlsState = { autoRotate: false, enableDamping: true }
const Material = {
    uniforms: {
        uTime: { type: 'f', value: 0.0 },
    },
    vertexShader: stringVertex,
    fragmentShader: stringFrag,
    side: DoubleSide,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true,
}
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    Material.uniforms.uTime.value += delta
})
</script>

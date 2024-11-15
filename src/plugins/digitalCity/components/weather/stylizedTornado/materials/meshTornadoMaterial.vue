<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 09:23:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-15 10:48:38
-->
<template>
    <TresShaderMaterial v-bind="tsMaterialConfig" />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import vertexShader from './shaders/tornado/vertex.glsl'
import fragmentShader from './shaders/tornado/fragment.glsl'

const props = withDefaults(
    defineProps<{
        colorBase?: string
        colorIntensity?: number
        twirlAmount?: number
        radialShearAmount?: THREE.Vector2
        twirlOffset?: THREE.Vector2
        radialOffset?: THREE.Vector2
        twirlCenter?: THREE.Vector2
        radialCenter?: THREE.Vector2
        noisePower?: number
        alphaThreshold?: number
        showEdge?: boolean
    }>(),
    {
        colorBase: '#ff821c', // base color
        colorIntensity: 12, // color intensity for bloom
        twirlAmount: 8, // amount to twirl by
        radialShearAmount: new THREE.Vector2(5.0, 5.0), // amount to radial shear by
        twirlOffset: new THREE.Vector2(0.0, 0.5), // amount to offset twirl time
        radialOffset: new THREE.Vector2(0.0, 0.5), // amount to offset radial time
        twirlCenter: new THREE.Vector2(0.5, -0.5), // cennter of swirl
        radialCenter: new THREE.Vector2(0.5, 0.5), // center of radial shear
        noisePower: 1, // power value for noise
        alphaThreshold: 0.17, // controls alpha clip
        showEdge: false, // show cuttoff edge
    },
)

const tsMaterialConfig = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(props.colorBase).multiplyScalar(props.colorIntensity) },
        uTwirl: { value: props.twirlAmount },
        uRadialShear: { value: props.radialShearAmount },
        uTwirlOffset: { value: props.twirlOffset },
        uRadialOffset: { value: props.radialOffset },
        uTwirlCenter: { value: props.twirlCenter },
        uRadialCenter: { value: props.radialCenter },
        uNoisePower: { value: props.noisePower },
        uAlphaThreshold: { value: props.alphaThreshold },
        uEdge: { value: props.showEdge },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: true,
}

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
    tsMaterialConfig.uniforms.uTime.value += delta
})

watch(
    () => props.colorBase,
    (color) => {
        tsMaterialConfig.uniforms.uColor.value.setStyle(color).multiplyScalar(props.colorIntensity)
    },
)
</script>

<template>
    <TresShaderMaterial v-bind="tsMaterialConfig" />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { Resource } from 'PLS/resourceManager'
import vertexShader from './shaders/spiral/vertex.glsl'
import fragmentShader from './shaders/spiral/fragment.glsl'

const props = withDefaults(
    defineProps<{
        frontColor?: string
        backColor?: string
        intensity?: number
        powerOffset?: number
        noiseCutOff?: number
        colorBoth?: boolean
    }>(),
    {
        frontColor: '#320564', // front color, should be darker
        backColor: '#ec22ff', // back color, should be lighter
        intensity: 1.5, // intensity of back color
        powerOffset: 4.0, // used to increase black of noise
        noiseCutOff: 0.32, // controls the step function for the noise cut off
        colorBoth: false, // decide if you color both sides
    },
)
const pTexture = Resource.getItem('noiseVoronoi.png')

const tsMaterialConfig = {
    uniforms: {
        uTime: { value: 0 },
        uFrontColor: { value: new THREE.Color(props.frontColor) },
        uBackColor: { value: new THREE.Color(props.backColor).multiplyScalar(props.intensity) },
        uNoise: { value: pTexture },
        uPowerOffset: { value: props.powerOffset },
        uNoiseCutOff: { value: props.noiseCutOff },
        uColorBoth: { value: props.colorBoth },
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
    () => [props.frontColor, props.backColor],
    ([frontColor, backColor]) => {
        tsMaterialConfig.uniforms.uFrontColor.value.setStyle(frontColor)
        tsMaterialConfig.uniforms.uBackColor.value.setStyle(backColor).multiplyScalar(props.intensity)
    },
)
</script>

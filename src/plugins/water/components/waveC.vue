<template>
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="1">
        <TresPlaneGeometry :args="[10, 10, 512, 512]"></TresPlaneGeometry>
        <TresShaderMaterial
            :side="THREE.DoubleSide"
            :vertexShader="vertexShader"
            :fragmentShader="fragmentShader"
            :uniforms="uniforms"
            :wireframe="wireframe"
        />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { watch } from 'vue'
import vertexShader from '../shaders/waveC.vert'
import fragmentShader from '../shaders/waveC.frag'
const props = withDefaults(
    defineProps<{
        wireframe?: boolean
        peakColor?: string
        valleyColor?: string
        colorOffset?: number
        colorDamping?: number
        sinWaveFrequency?: any
        waveAmplitude?: number
        sinWaveSpeed?: any
        perlinWaveIterations?: number
        perlinWaveFrequency?: number
        perlinWaveAmplitude?: number
        perlinWaveSpeed?: number
    }>(),
    {
        wireframe: false,
        peakColor: '#b367ff',
        valleyColor: '#184650',
        colorOffset: 0.9,
        colorDamping: 4.5,
        sinWaveFrequency: { x: 0.4, y: 0.3 },
        waveAmplitude: 0.8,
        sinWaveSpeed: { x: 0.6, y: 1.3 },
        perlinWaveIterations: 3,
        perlinWaveFrequency: 0.6,
        perlinWaveAmplitude: 0.5,
        perlinWaveSpeed: 0.6,
    },
)

const uniforms = {
    uTime: { value: 0 },
    uPeakColor: { value: new THREE.Color(props.peakColor) },
    uValleyColor: { value: new THREE.Color(props.valleyColor) },
    uColorOffset: { value: props.colorOffset },
    uColorDamping: { value: props.colorDamping },
    uSinWaveFrequency: { value: new THREE.Vector2(props.sinWaveFrequency.x, props.sinWaveFrequency.y) },
    uWaveAmplitude: { value: props.waveAmplitude },
    uSinWaveSpeed: { value: new THREE.Vector2(props.sinWaveSpeed.x, props.sinWaveSpeed.y) },
    uPerlinWaveIterations: { value: props.perlinWaveIterations },
    uPerlinWaveFrequency: { value: props.perlinWaveFrequency },
    uPerlinWaveAmplitude: { value: props.perlinWaveAmplitude },
    uPerlinWaveSpeed: { value: props.perlinWaveSpeed },
}

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    uniforms.uTime.value = elapsed
})

watch(
    () => props,
    () => {
        uniforms.uPeakColor.value.setStyle(props.peakColor)
        uniforms.uValleyColor.value.setStyle(props.valleyColor)
        uniforms.uColorOffset.value = props.colorOffset
        uniforms.uColorDamping.value = props.colorDamping
        uniforms.uSinWaveFrequency.value.set(props.sinWaveFrequency.x, props.sinWaveFrequency.y)
        uniforms.uWaveAmplitude.value = props.waveAmplitude
        uniforms.uSinWaveSpeed.value.set(props.sinWaveSpeed.x, props.sinWaveSpeed.y)
        uniforms.uPerlinWaveIterations.value = props.perlinWaveIterations
        uniforms.uPerlinWaveFrequency.value = props.perlinWaveFrequency
        uniforms.uPerlinWaveAmplitude.value = props.perlinWaveAmplitude
        uniforms.uPerlinWaveSpeed.value = props.perlinWaveSpeed
    },
    { deep: true },
)
</script>

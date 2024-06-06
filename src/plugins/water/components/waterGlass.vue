<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 14:04:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-06 08:53:16
-->

<template>
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="0.1">
        <TresPlaneGeometry :args="[1, 1, 64, 64]"></TresPlaneGeometry>
        <CustomShaderMaterial v-bind="smState" :baseMaterial="THREE.MeshPhysicalMaterial" :vertexShader="vertexShader" :uniforms="uniforms" silent />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import { watch } from 'vue'
import vertexShader from '../shaders/waterGlass.vert'
const props = withDefaults(
    defineProps<{
        color?: string
        amplitude?: number
        frequency?: number
    }>(),
    {
        color: '#fff',
        amplitude: 0.066,
        frequency: 5.0,
    },
)

const uniforms = {
    time: { type: 'f', value: 0.1 },
    amplitude: { type: 'f', value: props.amplitude },
    speed: { type: 'f', value: 0.277 },
    frequency: { type: 'f', value: props.frequency },
}
const smState = {
    side: THREE.DoubleSide,
    // ior: 1.0,
    // reflectivity: 1.0,
    // sheen: 0.1,
    // sheenColor: new THREE.Color('#346DB7'),
    // transparent: true,
    // opacity: 0.9,
    // depthWrite: false,
    // depthTest: true,
    color: new THREE.Color(props.color),
    metalness: 0.087,
    roughness: 0.0,
    transmission: 1,
    thickness: 1.5,
    refractionRatio: 1.5,
}
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    uniforms.time.value += delta
})

watch(
    () => props,
    () => {
        smState.color = new THREE.Color(props.color)
        uniforms.amplitude.value = props.amplitude
        uniforms.frequency.value = props.frequency
    },
    { deep: true },
)
</script>

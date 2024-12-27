<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 09:31:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-27 11:26:28
-->
<template>
    <CustomShaderMaterial :baseMaterial="baseMaterial" :vertexShader="vertexShader" :fragmentShader="fragmentShader" :uniforms="uniforms" />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import fragmentShader from '../shaders/hexGridMaterial.frag'

const props = defineProps({
    baseMaterial: {
        default: new THREE.MeshPhongMaterial(),
    },
    speed: {
        default: 1.0,
    },
    gridWeight: {
        default: 0.03,
    },
    raisedBottom: { default: 0.05 },
    waveFrequency: { default: 0.2 },
    wavePow: { default: 4.0 },
    division: { default: 32.0 },
    divisionScaleX: { default: 1.0 },
    direction: { default: 4 }, // vertical: 4, horizontal: 3, radial: 5
    isReversed: { default: false },
})

const vertexShader = `
varying vec2 uvPosition;
void main() {
    uvPosition = uv;
}
`
const uniforms = {
    gridWeight: { value: props.gridWeight },
    raisedBottom: { value: props.raisedBottom },
    waveFrequency: { value: props.waveFrequency },
    wavePow: { value: props.wavePow },
    direction: { value: props.direction },
    isReversed: { value: props.isReversed },
    hasMaskTexture: { value: false },
    maskTexture: { value: null },
    division: { value: props.division },
    divisionScaleX: { value: props.divisionScaleX },
    time: { value: 0.0 },
} as any

watch(
    () => [props.gridWeight, props.raisedBottom, props.waveFrequency, props.wavePow, props.division, props.divisionScaleX, props.direction, props.isReversed],
    ([gridWeight, raisedBottom, waveFrequency, wavePow, division, divisionScaleX, direction, isReversed]) => {
        uniforms.gridWeight.value = gridWeight
        uniforms.raisedBottom.value = raisedBottom
        uniforms.waveFrequency.value = waveFrequency
        uniforms.wavePow.value = wavePow
        uniforms.division.value = division
        uniforms.divisionScaleX.value = divisionScaleX
        uniforms.direction.value = direction
        uniforms.isReversed.value = isReversed
    },
)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    uniforms.time.value += delta * props.speed
})
</script>

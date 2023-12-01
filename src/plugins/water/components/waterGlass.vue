<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 14:04:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-01 19:14:34
-->

<template>
	<TresMesh :rotation-x="-Math.PI / 2" :position-y="1">
		<TresPlaneGeometry :args="[10, 10, 20, 20]"></TresPlaneGeometry>
		<CustomShaderMaterial v-bind="smState" :baseMaterial="THREE.MeshPhysicalMaterial" :vertexShader="vertexShader"
			:uniforms="uniforms" silent />
	</TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import vertexShader from '../shaders/waterGlass.vert?raw'

const uniforms = {
	time: { type: "f", value: 0.1 },
	amplitude: { type: "f", value: 0.366 },
	speed: { type: "f", value: 0.277 },
	frequency: { type: "f", value: 15.0 },
}
const smState = {
	side: THREE.DoubleSide,
	ior: 1.0,
	reflectivity: 1.0,
	sheen: 0.1,
	sheenColor: new THREE.Color('#346DB7'),
	// transparent: true,
	// opacity: 0.9,
	// depthWrite: false,
	// depthTest: true,
	color: new THREE.Color('#346DB7'),
	metalness: 0.334,
	roughness: 0.0,
	transmission: 1,
	thickness: 1.5,
	refractionRatio: 1.0
}
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	uniforms.time.value += delta;
})

</script>

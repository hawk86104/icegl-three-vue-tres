<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 14:04:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-01 15:02:39
-->

<template>
	<TresMesh :rotation-x="-Math.PI / 2" :position-y="1">
		<TresPlaneGeometry :args="[10, 10]"></TresPlaneGeometry>
		<TresShaderMaterial v-bind="smState" />
	</TresMesh>
</template>

<script setup lang="ts">
import { watch } from "vue"
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import vertexShader from '../shaders/tilingCaustics.vert?raw'
import fragmentShader from '../shaders/tilingCaustics.frag?raw'
const props = withDefaults(
	defineProps<{
		speed?: number
		backgroundColor?: string
		color?: string
		flowSpeed?: Object
		brightness?: number
	}>(),
	{
		speed: 0.478,
		color: '#fff',
		flowSpeed: { x: 0.01, y: 0.01 },
		brightness: 1.5
	},
)

const smState = {
	uniforms: {
		resolution: { type: "v2", value: { x: 1, y: 1 } },
		backgroundColor: { type: "c", value: new THREE.Color(props.color) },
		color: { type: "c", value: new THREE.Color('#fff') },
		speed: { type: "f", value: props.speed },
		flowSpeed: { type: "v2", value: props.flowSpeed },
		brightness: { type: "f", value: props.brightness },
		time: { type: "f", value: 0.1 },
	},
	// 顶点着色器
	vertexShader: vertexShader,
	// 片段着色器
	fragmentShader: fragmentShader,
	side: THREE.DoubleSide,
	transparent: true,
	depthWrite: false,
	depthTest: true,
}
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	smState.uniforms.time.value += delta;
})
watch(() => props, () => {
	smState.uniforms.speed.value = props.speed
	smState.uniforms.brightness.value = props.brightness
	smState.uniforms.backgroundColor.value = new THREE.Color(props.color)
}, { deep: true })
</script>

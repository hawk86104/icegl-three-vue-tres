<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-22 09:11:27
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 11:06:12
-->
<template>
	<TresMesh :rotation-x="-Math.PI / 2">
		<TresPlaneGeometry :args="props.size" />
		<TresMeshStandardMaterial v-bind="tmsMaterial" />
	</TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { watch, reactive, createVNode, render } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { intLightningPattern, loopLightningPattern, setSpeed } from '../common/lightningPattern'

const props = withDefaults(defineProps<{
	size?: any
	color?: string
	opacity?: number
	textureRepeat?: any
	speed?: number
}>(), {
	size: [10, 10],
	color: '#fff',
	opacity: 0.95,
	textureRepeat: [1, 1],
	speed: 10
})

const width = 1024
const height = 768
const floorNode = createVNode('canvas', { width, height, style: { backgroundColor: "green" } })
render(floorNode, document.createElement('div'))

intLightningPattern(width, height, (floorNode.el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D, props.speed)

const floorTexture = new THREE.CanvasTexture(floorNode.el as HTMLCanvasElement)
floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(props.textureRepeat[0], props.textureRepeat[1])

const tmsMaterial = reactive({
	color: props.color,
	map: floorTexture,
	side: THREE.DoubleSide,
	transparent: true,
	opacity: props.opacity,
	blending: THREE.AdditiveBlending,
	flatShading: true,
	depthTest: true
})
watch(
	() => props.color,
	(newVal) => {
		tmsMaterial.color = new THREE.Color(newVal)
	}
)
watch(
	() => props.opacity,
	(newVal) => {
		tmsMaterial.opacity = newVal
	}
)
watch(
	() => props.speed,
	(newVal) => {
		setSpeed(props.speed)
	}
)

const { onLoop } = useRenderLoop()
onLoop(() => {
	loopLightningPattern()
	floorTexture.needsUpdate = true
})
</script>
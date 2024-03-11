<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 15:30:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 19:05:11
-->

<script setup lang="ts">
import * as THREE from 'three'
import particlesVertex from '../shaders/particles.vert'
import particlesFragment from '../shaders/particles.frag'

const props = withDefaults(defineProps<{
	progress?: number
	width?: number
	height?: number
}>(), {
	progress: 0,
	width: 256,
	height: 256
})


const makeRenderMaterial = () => {
	return new THREE.ShaderMaterial({
		uniforms: {
			uPositions: { value: null },
			uSize: { value: 12 },
			uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
			uColor: {
				value: new THREE.Color('#ffaa00')
			},
		},
		vertexShader: particlesVertex,
		fragmentShader: particlesFragment,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	})
}
const createParticles = (width: number, height: number) => {
	const length = width * height
	let vertices = new Float32Array(length * 3)
	for (let i = 0; i < length; i++) {
		let i3 = i * 3
		vertices[i3 + 0] = (i % width) / width
		vertices[i3 + 1] = (i / width) / height
	}
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
	return new THREE.Points(geometry, makeRenderMaterial())
}

let particles: THREE.Points = createParticles(props.width, props.height)
defineExpose({
	particles: particles,
})

</script>
<template>
	<primitive :object="particles" />
</template>

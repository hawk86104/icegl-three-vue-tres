<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 15:30:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 14:25:28
-->

<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { makeSimMesh, createParticles } from '../lib/utils'
import { useTresContext, useRenderLoop } from '@tresjs/core'

const props = withDefaults(defineProps<{
	progress?: number
}>(), {
	progress: 0
})

const boyGlb = (await useGLTF('./plugins/UIdemo/model/boy.glb')).scene
const boyGeometry = (boyGlb.children[0] as THREE.Mesh).geometry
boyGeometry.scale(2.2, 2.2, 2.2)
boyGeometry.translate(-1, -2.5, 0)
boyGeometry.rotateY(-Math.PI / 2)
boyGeometry.rotateZ(Math.PI / 3)

const oniGlb = (await useGLTF('./plugins/UIdemo/model/oni.glb')).scene
const oniGeometry = (oniGlb.children[0] as THREE.Mesh).geometry
oniGeometry.scale(0.2, 0.1, 0.2)
oniGeometry.translate(0, -1.5, 0)

const simMesh = makeSimMesh(boyGeometry, oniGeometry)
const width = 256
const height = 256
let particles: THREE.Points
const { camera, renderer, scene } = useTresContext()
let FBOscene: THREE.Scene, FBOcamera: THREE.Camera, FBOrtt: THREE.WebGLRenderTarget<THREE.Texture>
watchEffect(() => {
	if (renderer.value && !FBOscene) {
		FBOscene = new THREE.Scene()
		FBOcamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
		FBOrtt = new THREE.WebGLRenderTarget(width, height, {
			minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter,
			generateMipmaps: false,
			colorSpace: THREE.SRGBColorSpace,
			depthBuffer: false,
			stencilBuffer: false,
			format: THREE.RGBAFormat,
			type: THREE.FloatType
		})

		FBOscene.add(simMesh)
		particles = createParticles(width, height)
		// scene.value.add(particles)
	}
})
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
	if (renderer.value && FBOrtt && particles && camera.value) {
		renderer.value.setRenderTarget(FBOrtt)
		renderer.value.clear()
		renderer.value.render(FBOscene, FBOcamera as THREE.Camera)
		renderer.value.setRenderTarget(null)


		simMesh.material.uniforms.uScroll.value = props.progress
		simMesh.material.uniforms.uTime.value = elapsed

		// Use the result of the swap as the new position for the particles' renderer
		particles.material.uniforms.uPositions.value = FBOrtt.texture

		renderer.value.render(scene.value, camera.value)
		// console.log('onLoop ~ progress:', props.progress)
		// console.log('onLoop ~ elapsed:', elapsed)
	}
})

</script>
<template>
	<primitive :object="particles" />
	<!-- <primitive :object="boyGlb" />
		<primitive :object="oniGlb" /> -->
</template>

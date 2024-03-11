<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-11 15:02:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 15:30:48
-->
<script setup lang="ts">
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { makeSimMesh } from '../lib/utils'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import particalMesh from '../components/particalMesh.vue'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
	progress?: number
	width?: number
	height?: number
}>(), {
	progress: 0,
	width: 256,
	height: 256
})

const pMesh = ref()
const fboTarget = new THREE.WebGLRenderTarget(props.width, props.height, {
	minFilter: THREE.NearestFilter,
	magFilter: THREE.NearestFilter,
	generateMipmaps: false,
	colorSpace: THREE.SRGBColorSpace,
	depthBuffer: false,
	stencilBuffer: false,
	format: THREE.RGBAFormat,
	type: THREE.FloatType
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

const FBOscene = new THREE.Scene()
const FBOcamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
FBOscene.add(simMesh)

const { onLoop } = useRenderLoop()
const { scene, camera, renderer } = useTresContext()
onLoop(({ elapsed }) => {
	if (renderer.value && camera.value && pMesh.value) {
		renderer.value.setRenderTarget(fboTarget)
		renderer.value.clear()
		renderer.value.render(FBOscene, FBOcamera as THREE.Camera)
		renderer.value.setRenderTarget(null)

		simMesh.material.uniforms.uScroll.value = props.progress
		simMesh.material.uniforms.uTime.value = elapsed

		pMesh.value.particles.material.uniforms.uPositions.value = fboTarget.texture
		renderer.value.render(scene.value, camera.value)
	}
})

</script>

<template>
	<particalMesh ref="pMesh" :progress="progress" />
</template>
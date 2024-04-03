<template></template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { LayerMaterial, Depth, Color } from 'lamina/vanilla'
import { lightFormer } from '../common/lightFormer'
import { NumberInputPlugin } from '@tweakpane/core'

const props = withDefaults(defineProps<{
	resolution?: number
	near?: number
	far?: number
}>(), {
	resolution: 256,
	near: 1,
	far: 1000,
})

const fbo = new THREE.WebGLCubeRenderTarget(props.resolution)
fbo.texture.type = THREE.HalfFloatType
const cubeCamera = new THREE.CubeCamera(props.near, props.far, fbo)
const virtualScene = new THREE.Scene()

const environmentMesh = new THREE.Group()
const envObject = new lightFormer()
envObject.mesh.scale.set(10, 10, 1)
envObject.mesh.position.set(0, 5, -9)
envObject.mesh.rotation.x = Math.PI / 2

const envObject2 = new lightFormer({ intensity: 4 })
envObject2.mesh.scale.set(20, 0.1, 1)
envObject2.mesh.position.set(-5, 1, -1)
envObject2.mesh.rotation.y = Math.PI / 2

const envObject3 = new lightFormer()
envObject3.mesh.scale.set(20, 0.5, 1)
envObject3.mesh.position.set(-5, -1, -1)
envObject3.mesh.rotation.y = Math.PI / 2

const envObject4 = new lightFormer()
envObject4.mesh.scale.set(20, 1, 1)
envObject4.mesh.position.set(10, 1, 0)
envObject4.mesh.rotation.y = -Math.PI / 2

// 红光 待动效
const envObject5 = new lightFormer({ form: 'ring', color: 'red' })
envObject5.mesh.scale.set(10, 10, 10)
envObject5.mesh.position.set(-15, 4, -18)

environmentMesh.add(envObject.mesh, envObject2.mesh, envObject3.mesh, envObject4.mesh, envObject5.mesh)

// 一排灯
const lightFormerGrouprotaion = new THREE.Group()
lightFormerGrouprotaion.rotation.set(0, 0.5, 0)

const lightFormerGroup = new THREE.Group()
lightFormerGrouprotaion.add(lightFormerGroup)

const lightFormerPositions = [2, 0, 2, 0, 2, 0, 2, 0]
lightFormerPositions.forEach((x, index) => {
	const envObjectTmp = new lightFormer({ form: 'circle', intensity: 2 })
	envObjectTmp.mesh.rotation.x = Math.PI / 2
	envObjectTmp.mesh.scale.set(3, 1, 1)
	envObjectTmp.mesh.position.set(x, 4, index * 4)
	lightFormerGroup.add(envObjectTmp.mesh)
})
environmentMesh.add(lightFormerGrouprotaion)

//外部Background
const backgroundGeometry = new THREE.SphereGeometry(1, 64, 64)
const backgroundMaterial = new LayerMaterial({
	side: THREE.BackSide,
	layers: [
		new Color({
			color: '#444',
			mode: 'normal',
			alpha: 1,
		}),
		new Depth({
			colorA: 'blue',
			colorB: 'black',
			alpha: 0.5,
			mode: 'normal',
			near: 0,
			far: 300,
			origin: new THREE.Vector3(100, 100, 100),
		}),
	],
})
const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
backgroundMesh.scale.set(100, 100, 100)
environmentMesh.add(backgroundMesh)

// const backgroundMesh2 = backgroundMesh.clone()
// backgroundMesh2.scale.set(10, 10, 10)

const { scene, renderer, sizes } = useTresContext()
watchEffect(() => {
	if (sizes.width.value) {
		virtualScene.add(environmentMesh)

		// scene.value.background = backgroundMaterial.texture
		// scene.value.add(backgroundMesh2)
	}
})
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
	if (scene.value) {
		(lightFormerGroup.position.z += delta * 10) > 20 && (lightFormerGroup.position.z = -60)
		cubeCamera.update(renderer.value, virtualScene)
		scene.value.environment = fbo.texture
		scene.value.background = fbo.texture
		scene.value.backgroundBlurriness = 1.0
	}
})
</script>
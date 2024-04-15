<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-14 17:59:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 20:53:35
-->
<template>
	<primitive :object="scene" :rotation-y="Math.PI" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, watch } from 'vue'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
import { flatModel } from './utils'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const props = withDefaults(
	defineProps<{
		run?: boolean
	}>(),
	{
		run: false,
	},
)
const { scene } = await useGLTF('./plugins/industry4/model/su7_car/sm_car.gltf', { draco: false }, (gltfLoader) => { gltfLoader.setMeshoptDecoder(MeshoptDecoder) })
const { map: pTexture } = await useTexture({ map: "./plugins/industry4/texture/t_car_body_AO.raw.jpg" })
pTexture.flipY = false
pTexture.colorSpace = THREE.LinearSRGBColorSpace
pTexture.minFilter = THREE.NearestFilter
pTexture.magFilter = THREE.NearestFilter
pTexture.channel = 1

const carModel = flatModel(scene)

const body = carModel[2] as THREE.Mesh
const bodyMat = body.material as THREE.MeshStandardMaterial
bodyMat.envMapIntensity = 5
bodyMat.color = new THREE.Color("#26d6e9")
carModel.forEach((item: THREE.Mesh) => {
	if (item.isMesh) {
		const mat = item.material as THREE.MeshStandardMaterial
		mat.aoMap = pTexture
	}
})

const wheel = carModel[35] as THREE.Mesh
wheel.children.forEach((child) => {
	const mesh = child as THREE.Mesh
	const mat = mesh.material as THREE.MeshStandardMaterial
	mat.envMapIntensity = 5
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
	if (props.run) {
		wheel.children.forEach((child) => {
			child.rotateZ(-delta * 30 * 0.5)
		})
	}
})

watch(
	() => props.run,
	(newVal) => {
		if (newVal) {
			wheel.children.forEach((child) => {
				const mesh = child as THREE.Mesh
				const mat = mesh.material as THREE.MeshStandardMaterial
				mat.roughness = 0
				mat.envMapIntensity = 3
			})
		} else {
			wheel.children.forEach((child) => {
				const mesh = child as THREE.Mesh
				const mat = mesh.material as THREE.MeshStandardMaterial
				mat.roughness = 1
				mat.envMapIntensity = 5
			})
		}
	}
)
</script>

<template>
	<primitive :object="nodes.Sketchfab_model" />
</template>

<script setup lang="ts">
import { MeshBasicMaterial } from 'three'
import { ref, watchEffect, watch } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { reduceModelLine, unreal } from '../common/utils'
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF(
	'./plugins/industry4/model/device.gltf',
	{ draco: true })
const lineGroup = reduceModelLine(nodes.Sketchfab_model)

const { camera, renderer, scene, sizes } = useTresContext()
let finalComposer, bloomComposer, renderScene, bloomPass
const darkMaterial = new MeshBasicMaterial({ color: 'black' })
watchEffect(() => {
	if (camera.value) {
		scene.value.add(lineGroup)
		debugger
		const { finalComposer: F,
			bloomComposer: B,
			renderScene: R,
			bloomPass: BP
		} = unreal(scene.value, camera.value, renderer.value, sizes.width.value, sizes.height.value)
		debugger
		console.log("watchEffect")
		finalComposer = F
		bloomComposer = B
		renderScene = R
		bloomPass = BP
		bloomPass.threshold = 0
		bloomPass.strength = 3
	}
})

// watch(
// 	() => camera.value,
// 	(data) => {
// 		DirectionalLightRef.value.position.copy(data.position)
// 	}, { deep: true }
// )

const materials = {}
const darkenNonBloomed = (obj: THREE.Mesh) => {
	if (obj.isMesh) {
		materials[obj.uuid] = obj.material;
		obj.material = darkMaterial;
	}
}
const restoreMaterial = (obj: THREE.Mesh) => {
	if (materials[obj.uuid]) {
		obj.material = materials[obj.uuid];
		// 用于删除没必要的渲染
		delete materials[obj.uuid];
	}
}
const { onLoop, onBeforeLoop, onAfterLoop } = useRenderLoop()
//旋转速度
let rotationX = 0.03
onLoop(({ elapsed }) => {
	// 旋转涡轮
	if (nodes.hull_turbine) {
		nodes.hull_turbine.rotation.x += rotationX
		nodes.blades_turbine_003.rotation.x += rotationX
	}

	if (finalComposer) {
		scene.value.traverse((child) => {
			restoreMaterial(child)
		})
		finalComposer.render()
	}
})
onBeforeLoop(() => {
	if (bloomComposer) {
		scene.value.traverse((child) => {
			darkenNonBloomed(child)
		})
		bloomComposer.render()
	}

})
onAfterLoop(() => {
})
</script>
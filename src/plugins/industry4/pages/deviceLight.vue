<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-18 16:10:26
-->
<template>
	<TresCanvas v-bind="state" window-size ref="CanvasRef">
		<TresPerspectiveCamera :position="[15, 15, 15]" ref="PCameraRef" :fov="45" :near="1" :far="1000" />
		<!-- 3.025669715883166, 0, -2.812027151791605 -->
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="40" />
		<TresDirectionalLight ref="DirectionalLightRef" :position="[0, 2, -4]" :intensity="1" />

		<primitive :object="nodes.Sketchfab_model" />
		<!-- :position="[0, 1, 0]"  -->

		<TresGridHelper :args="[10, 10]" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping, MeshBasicMaterial, Layers, Group } from 'three'
import { reactive, ref, watchEffect, watch } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { reduceModelLine, unreal } from '../common/utils';

const { nodes } = await useGLTF(
	'./plugins/industry4/model/device.gltf',
	{ draco: true })
const lineGroup = reduceModelLine(nodes.Sketchfab_model)
const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})
const controlsState = reactive({
	autoRotate: true,
})
const DirectionalLightRef = ref()
const PCameraRef = ref()
const CanvasRef = ref()

let finalComposer, bloomComposer, renderScene, bloomPass
const darkMaterial = new MeshBasicMaterial({ color: 'black' })
watchEffect(() => {
	if (PCameraRef.value) {
		CanvasRef.value.context.scene.value.add(lineGroup)
		debugger
		const { finalComposer: F,
			bloomComposer: B,
			renderScene: R,
			bloomPass: BP
		} = unreal(CanvasRef.value.context.scene.value, PCameraRef.value, CanvasRef.value.context.renderer.value,
			CanvasRef.value.context.sizes.width.value, CanvasRef.value.context.sizes.height.value)
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

watch(
	() => PCameraRef.value,
	(data) => {
		// DirectionalLightRef.value.position.copy(data.position)
	}, { deep: true }
)


const bloomLayer = new Layers()
const BLOOM_SCENE = 1
bloomLayer.set(BLOOM_SCENE)
const materials = {}
const darkenNonBloomed = (obj: THREE.Mesh) => {
	if (bloomLayer) {
		if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
			materials[obj.uuid] = obj.material;
			obj.material = darkMaterial;
		}
	}
}
const { onLoop } = useRenderLoop()
//旋转速度
let rotationX = 0.03
onLoop(({ elapsed }) => {
	// 旋转涡轮
	if (nodes.hull_turbine) {
		nodes.hull_turbine.rotation.x += rotationX
		nodes.blades_turbine_003.rotation.x += rotationX
	}
	// debugger
	CanvasRef.value.context.scene.value.traverse((child) => {
		darkenNonBloomed(child)
	})
	bloomComposer.render();
})
</script>
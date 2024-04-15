<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-12 09:48:40
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight :intensity="0.5" />

		<TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
			<TresSphereGeometry :args="[2, 32, 32]" />
			<TresMeshToonMaterial color="#006060" />
		</TresMesh>



		<TresDirectionalLight ref="TDirectionalLight" :position="[10, 8, 4]" :intensity="1" cast-shadow />
		<TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

		<TresGridHelper :position-y="0.1"/>
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, onMounted, shallowRef, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,

	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
	enableZoom: true,
	autoRotate: false,
	autoRotateSpeed: 2,
	maxPolarAngle: Math.PI,
	minPolarAngle: 0,
	maxAzimuthAngle: Math.PI,
	minAzimuthAngle: -Math.PI,
	enablePan: true,
	keyPanSpeed: 7,
	maxDistance: 100,
	minDistance: 0,
	minZoom: 0,
	maxZoom: 100,
	zoomSpeed: 1,
	enableRotate: true,
	rotateSpeed: 1,
})


// const { onLoop, pause, resume } = useRenderLoop()
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {

})


watchEffect(() => {

})
onMounted(() => {
})
</script>
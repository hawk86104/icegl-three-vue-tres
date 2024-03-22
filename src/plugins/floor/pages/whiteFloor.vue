<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-07 10:07:53
-->

<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<TresDirectionalLight ref="TDirectionalLight" v-light-helper :position="[0, 10, 10]" :intensity="1" color="#ffffff"
			cast-shadow />
		<Box :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" cast-shadow />
		<TresMesh :position="[0, 2, -4]" cast-shadow>
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<Suspense>
			<whiteFloorMesh v-bind="configState" />
		</Suspense>

		<Suspense>
			<skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"

import { OrbitControls, vLightHelper, Box } from '@tresjs/cientos'
import skyBox from 'PLS/skyBox/components/skyBoxAmesh.vue'
import { shallowRef, watchEffect, reactive } from 'vue'
import { Pane } from 'tweakpane'
import whiteFloorMesh from '../components/whiteFloorMesh.vue'

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

const configState = reactive({
	size: [20, 20],
	color: '#cbcb96',
	shadowColor: '#b8b59e',
	receiveShadow: true,
	edge: 0.35
})
const paneControl = new Pane({
	title: '地板参数',
	expanded: true,
})
paneControl.addBinding(configState, 'edge', {
	label: '边缘模糊',
	min: 0.2,
	max: 0.36,
	step: 0.01,
})
paneControl.addBinding(configState, 'color', { label: '地板颜色' })
paneControl.addBinding(configState, 'shadowColor', { label: '阴影颜色' })
paneControl.addBinding(configState, 'receiveShadow', { label: '显示阴影' })

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(1024, 1024)
		TDirectionalLight.value.shadow.camera.near = 0.1
		TDirectionalLight.value.shadow.camera.far = 5000
		TDirectionalLight.value.shadow.radius = 10
	}
})
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 08:09:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-27 08:51:23
-->

<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<!-- <TresDirectionalLight :position="[0, 10, 0]" :intensity="10" v-light-helper color="#ffffff" /> -->
		<Box :args="[1, 1, 1]" color="orange" :position="[3, 1, 0]" />
		<TresMesh :position="[0, 2, -4]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>
		<Suspense>
			<reflectorShaderMesh v-bind="configState" />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls, Box } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import reflectorShaderMesh from '../components/reflectorShaderMesh.vue'

const configState = reactive({
	reflectivity: 0.49,
	mirror: 0.25,	// 去除纹理 镜面化 
	mixStrength: 26,
	showGridHelper: true,
	// color: '#ffffff'
})

const paneControl = new Pane({
	title: '镜面参数',
	expanded: true,
})
// paneControl.addBinding(configState, 'color', { label: '镜面颜色' })
paneControl.addBinding(configState, 'reflectivity', {
	label: '反射率',
	min: 0.01,
	max: 1.0,
	step: 0.01,
})
paneControl.addBinding(configState, 'mirror', {
	label: '镜面化',
	min: 0,
	max: 1.0,
	step: 0.01,
})
paneControl.addBinding(configState, 'mixStrength', {
	label: '混合',
	min: 0,
	max: 100,
	step: 1,
})
paneControl.addBinding(configState, 'showGridHelper', { label: '显示网格' })
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 17:21:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-01 19:23:19
-->

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[10, 10, 10]" />
		<TresAmbientLight :intensity="1" />
		<!-- <TresDirectionalLight :args="[0xffffff, 9.0]" v-light-helper /> -->
		<TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[0, 3, 0]" v-light-helper />
		<TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[1, 3, 1]" v-light-helper />
		<TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[-1, 3, -1]" v-light-helper />
		<OrbitControls />
		<TresGridHelper :args="[10, 10]" />
		<waterGlass />
	</TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import waterGlass from '../components/waterGlass.vue'
import { reactive } from 'vue';
import * as THREE from 'three'
// import { Pane } from 'tweakpane';
const gl = {
	clearColor: '#222',
	shadows: true,
	alpha: false,

	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
	useLegacyLights: true,
	antialias: true,	//开启锯齿
	logarithmicDepthBuffer: true,
}
// const typeState = reactive({
// 	color: "#fff",
// 	speed: 0.1,
// 	brightness: 1.5,
// 	flowSpeed: { x: 0.01, y: 0.01 }
// })
// const paneControl = new Pane({
// 	title: '参数',
// 	expanded: true
// });
// paneControl.addBinding(typeState, 'color', {
// 	label: '颜色'
// })
// paneControl.addBinding(typeState, 'speed', {
// 	label: '速度', min: 0.1,
// 	max: 1,
// 	step: 0.1,
// })
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 17:21:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-06 17:49:54
-->

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[1, 1, 1]" />
		<TresAmbientLight :intensity="1" />
		<TresDirectionalLight :args="[0xffffff, 9.0]" :position="[0, 0.5, 0]" />
		<TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[0.1, 0.3, 0]" />
		<!-- <TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[1, 3, 1]" v-light-helper />
		<TresPointLight :args="[0xffffff, 100.0, 0, 0.1]" :position="[-1, 3, -1]" v-light-helper /> -->
		<waterGlass v-bind="typeState" />

		<OrbitControls />
		<TresGridHelper :args="[1, 10]" />
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import waterGlass from '../components/waterGlass.vue'
import { reactive } from 'vue';
import * as THREE from 'three'
import { Pane } from 'tweakpane';
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
const typeState = reactive({
	color: "#346DB7",
	amplitude: 0.066,
	frequency: 5.0,
})
const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(typeState, 'color', {
	label: '颜色'
})
paneControl.addBinding(typeState, 'amplitude', {
	label: 'amplitude', min: 0.01,
	max: 1,
	step: 0.01,
})
paneControl.addBinding(typeState, 'frequency', {
	label: 'frequency', min: 0.1,
	max: 10,
	step: 0.1,
})
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:50:31
-->

<template>
	<loading />
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[0, 8, -13]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<Suspense>
			<whiteFloorMesh v-bind="flootrConfigState" />
		</Suspense>

		<Suspense>
			<!-- <ssrtGlassMesh modelPath="./plugins/basic/htmls/model/model.gltf" modelName="Macbook" -->
			<ssrtGlassMesh :scale="2" v-bind="glassConfig"
				modelPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb"
				modelName="statue"
				skyBoxTexture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>

		<Suspense>
			<skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">

import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from "three"

import { OrbitControls } from '@tresjs/cientos'
import whiteFloorMesh from 'PLS/floor/components/whiteFloorMesh.vue'
import skyBox from 'PLS/skyBox/components/skyBoxAmesh.vue'
import { reactive } from 'vue'
import { Pane } from 'tweakpane'

import ssrtGlassMesh from "../components/ssrtGlassMesh.vue"

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
	// disableRender: true
}

const flootrConfigState = reactive({
	size: [20, 20],
	color: '#cbcb96',
	shadowColor: '#b8b59e',
	edge: 0.35
})

const glassConfig = reactive({
	extintionFactor: 5.0,
	reflectionFactor: 1,
	exposure: 0,
	extintionColor1: 'rgb(192,123,25)',
	extintionColor2: 'rgb(26, 166, 192)',
	extintionCol1Random: false,
	extintionCol2Random: false
})
const paneControl = new Pane({ title: '参数', });
paneControl.addBinding(glassConfig, 'extintionFactor', {
	label: '消光系数', min: 0,
	max: 10,
	step: 0.1,
})
paneControl.addBinding(glassConfig, 'reflectionFactor', {
	label: '反射系数', min: 0,
	max: 2,
	step: 0.1,
})
paneControl.addBinding(glassConfig, 'exposure', {
	label: '曝光系数', min: -1,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(glassConfig, 'extintionColor1', {
	label: '消光颜色一'
})
paneControl.addBinding(glassConfig, 'extintionColor2', {
	label: '消光颜色二'
})
paneControl.addBinding(glassConfig, 'extintionCol1Random', {
	label: '随机色1'
})
paneControl.addBinding(glassConfig, 'extintionCol2Random', {
	label: '随机色2'
})
</script>
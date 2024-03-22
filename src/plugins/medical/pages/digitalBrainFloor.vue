<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-10 16:13:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:58:06
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[100, 400, 500]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight :intensity="0.5" />
		<TresGroup :position="[0, 120, 0]">
			<cloudPoints v-if="cloudPointsState.show" :model="model" v-bind="cloudPointsState"></cloudPoints>
			<Suspense>
				<xRayEffect v-if="xRayState.show" :model="model" v-bind="xRayState" />
			</Suspense>

			<bubblesEffect v-if="bubblesState.show" :model="model" v-bind="bubblesState" />
		</TresGroup>
		<reflectorMesh v-bind="configState" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { Pane } from 'tweakpane';
import reflectorMesh from 'PLS/floor/components/reflectorMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import { loadOBJ } from '../common/util'
import cloudPoints from '../components/cloudPoints.vue'
import xRayEffect from '../components/xRayEffect.vue'
import bubblesEffect from '../components/bubblesEffect.vue'

const configState = reactive({
	mirrorSize: 500,
	gridSize: 490,
	mirrorColor: '#efefef',
	divisions: 10,								//网格密度							 初始化时设置
	colorCenterLine: "#444444",		//网格颜色 中心的XZ轴		  初始化时设置
	colorGrid: "#888888"					//网格颜色							 初始化时设置
})

const cloudPointsState = reactive({
	color: '#fff',
	show: true,
	opacity: 1.0
})
const paneControl = new Pane({ title: '参数', });
paneControl.addBinding(cloudPointsState, 'show', { label: '点云显示' })
paneControl.addBinding(cloudPointsState, 'color', { label: '点云颜色' })
paneControl.addBinding(cloudPointsState, 'opacity', {
	label: '点云透明度', min: 0,
	max: 1,
	step: 0.1,
})
const xRayState = reactive({
	color: '#84ccff',
	show: true,
	opacity: 1.0
})
paneControl.addBinding(xRayState, 'show', { label: '脑轮廓显示' })
paneControl.addBinding(xRayState, 'color', { label: '脑轮廓颜色' })
paneControl.addBinding(xRayState, 'opacity', {
	label: '脑轮廓透明度', min: 0,
	max: 1,
	step: 0.1,
})

const bubblesState = reactive({
	color: '#9e00af',
	show: true,
	opacity: 1.0
})
paneControl.addBinding(bubblesState, 'show', { label: '脑组织显示' })
paneControl.addBinding(bubblesState, 'color', { label: '脑组织颜色' })
paneControl.addBinding(bubblesState, 'opacity', {
	label: '脑组织透明度', min: 0,
	max: 1,
	step: 0.1,
})

const path = './plugins/medical/model/brainparts.OBJ';
const loader = new OBJLoader()
const model = await loadOBJ(path, loader)
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
	autoRotateSpeed: 2,
})
</script>
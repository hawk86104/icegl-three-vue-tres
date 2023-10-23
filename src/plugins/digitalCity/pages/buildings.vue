<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-23 15:42:30
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<buildingsModel v-if="buildingState.show && showbuildingsLines" :model="CityFBX"
			:bulidingsColor="buildingState.bulidingsColor" :landColor="buildingState.landColor"
			:opacity="buildingState.opacity" />
		<buildingsLines v-if="buildingsLinesState.show && showbuildingsLines" :builds="CityFBX.city"
			:width="buildingsLinesState.width" :color="buildingsLinesState.color" :opacity="buildingsLinesState.opacity" />
		<TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
		<TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three';
import { reactive, onMounted, watchEffect, ref } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { Pane } from 'tweakpane';

import { loadCityFBX } from '../common/loadCity';
import buildingsModel from '../components/buildings/buildingsModel.vue';
import buildingsLines from '../components/buildings/buildingsLines.vue';

const state = reactive({
	clearColor: '#000000',
	shadows: true,
	alpha: false,
	useLegacyLights: true,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
});
const controlsState = reactive({ autoRotate: true, enableDamping: true });

const showbuildingsLines = ref(false)
const CityFBX = await loadCityFBX()
showbuildingsLines.value = true
watchEffect(() => {
});
onMounted(() => {
	const paneControl = new Pane({
		title: '建筑效果',
		expanded: true,
	});
	paneControl.containerElem_.style.top = '54px'

	const f1 = paneControl.addFolder({
		title: '线条',
	});
	f1.addBinding(buildingsLinesState, 'show', { label: '显示' })
	f1.addBinding(buildingsLinesState, 'color', { label: '颜色' })
	f1.addBinding(buildingsLinesState, 'width', {
		label: '宽度',
		min: 0,
		max: 10,
		step: 1,
	})
	f1.addBinding(buildingsLinesState, 'opacity', {
		label: '透明度',
		min: 0,
		max: 1,
		step: 0.1,
	})

	const f2 = paneControl.addFolder({
		title: '建筑物',
	});
	f2.addBinding(buildingState, 'show', { label: '显示' })
	f2.addBinding(buildingState, 'bulidingsColor', { label: '楼宇颜色' })
	f2.addBinding(buildingState, 'opacity', {
		label: '透明度',
		min: 0,
		max: 1,
		step: 0.1,
	})
	f2.addBinding(buildingState, 'landColor', { label: '地面颜色' })
})
// buildingsLinesState 建筑线条控制
const buildingsLinesState = reactive({
	width: 1.0,
	color: '#000',
	opacity: 1.0,
	show: true
})
// buildingState 建筑线条控制
const buildingState = reactive({
	bulidingsColor: '#EC5BFF',
	landColor: '#112233',
	opacity: 0.9,
	show: true
})

</script>

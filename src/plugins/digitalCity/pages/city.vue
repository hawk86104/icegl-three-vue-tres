<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-21 17:22:46
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<buildingsModel v-if="buildingState.show && showBuildingLines" :model="CityFBX"
			:bulidingsColor="buildingState.bulidingsColor" :landColor="buildingState.landColor"
			:opacity="buildingState.opacity" />
		<buildingLines v-if="buildingLinesState.show && showBuildingLines" :builds="CityFBX.city"
			:width="buildingLinesState.width" :color="buildingLinesState.color" :opacity="buildingLinesState.opacity" />
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
import buildingsModel from '../components/buildingsModel.vue';
import buildingLines from '../components/buildingLines.vue';

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

const showBuildingLines = ref(false)
const CityFBX = await loadCityFBX()
showBuildingLines.value = true
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
	f1.addBinding(buildingLinesState, 'show', { label: '显示' })
	f1.addBinding(buildingLinesState, 'color', { label: '颜色' })
	f1.addBinding(buildingLinesState, 'width', {
		label: '宽度',
		min: 0,
		max: 10,
		step: 1,
	})
	f1.addBinding(buildingLinesState, 'opacity', {
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
// buildingLinesState 建筑线条控制
const buildingLinesState = reactive({
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

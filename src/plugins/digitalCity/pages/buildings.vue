<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:49:29
-->
<template>
	<pagesShow ref="pagesShowRef" :showBuildings="false">
		<template v-slot:ability>
			<buildingsModel v-if="buildingState.show && showbuildingsLines" :model="CityFBX"
				:bulidingsColor="buildingState.bulidingsColor" :landColor="buildingState.landColor"
				:gradient="buildingState.gradient" :opacity="buildingState.opacity" />
			<buildingsLines v-if="buildingsLinesState.show && showbuildingsLines" :builds="CityFBX.city"
				:width="buildingsLinesState.width" :color="buildingsLinesState.color" :opacity="buildingsLinesState.opacity" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'; // watchEffect
import { Pane } from 'tweakpane';

import { loadCityFBX } from '../common/loadCity';
import buildingsModel from '../components/buildings/buildingsModelCustomShader.vue'; // buildingsModelIncompatible buildingsModelShader buildingsModelCustomShader
import buildingsLines from '../components/buildings/buildingsLines.vue';

import pagesShow from '../components/pagesShow.vue'

const pagesShowRef = ref()
const showbuildingsLines = ref(false)
const CityFBX = await loadCityFBX()
showbuildingsLines.value = true

// watchEffect(() => {
// 	if (pagesShowRef.value) {
// 		pagesShowRef.value.$refs.tcRef.value.context.value.scene.value.fog = true;
// 	}
// })

onMounted(() => {
	const paneControl = new Pane({
		title: '建筑效果',
		expanded: true,
	});
	// paneControl.containerElem_.style.top = '54px'

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
	f2.addBinding(buildingState, 'gradient', { label: '渐变' })
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
	bulidingsColor: '#e523ff',
	landColor: '#112233',
	opacity: 0.9,
	show: true,
	gradient: true
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-13 19:26:52
-->
<template>
	<pagesShow :showBuildings="false" :autoRotate="false">
		<template v-slot:ability>
			<buildingsHeatmap :model="CityFBX" v-bind="buildingState" />
			<buildingsLines v-bind="buildingsLinesState" :builds="CityFBX.city" />
		</template>
	</pagesShow>
	<dataDiv />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Pane } from 'tweakpane';

import { loadCityFBX } from '../common/loadCity';
import buildingsHeatmap from '../components/buildings/buildingsHeatmap.vue';
import buildingsLines from '../components/buildings/buildingsLines.vue';
import pagesShow from '../components/pagesShow.vue'
import dataDiv from '../components/dataDiv.vue'

const showbuildingsLines = ref(false)
const CityFBX = await loadCityFBX()
showbuildingsLines.value = true

const buildingsLinesState = reactive({
	width: 1.0,
	color: '#000',
	opacity: 1.0,
	show: true
})
const buildingState = reactive({
	opacity: 0.9,
})
const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(buildingState, 'opacity', {
	label: '透明度', min: 0,
	max: 1,
	step: 0.1,
})
</script>

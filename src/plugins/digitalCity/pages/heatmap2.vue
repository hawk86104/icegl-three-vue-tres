<template>
	<pagesShow :showBuildings="false">
		<template v-slot:ability>
			<buildingsHeatmap :model="CityFBX" v-bind="buildingState" />
			<buildingsLines v-bind="buildingsLinesState" :builds="CityFBX.city" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Pane } from 'tweakpane';

import { loadCityFBX } from '../common/loadCity';
import buildingsHeatmap from '../components/buildings/buildingsHeatmap.vue';
import buildingsLines from '../components/buildings/buildingsLines.vue';
import pagesShow from '../components/pagesShow.vue'

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

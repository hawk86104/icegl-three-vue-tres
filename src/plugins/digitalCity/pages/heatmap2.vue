<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-08 14:32:02
-->
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
	bulidingsColor: '#e523ff',
	landColor: '#112233',
	opacity: 0.9,
	show: true,
	gradient: true
})
</script>

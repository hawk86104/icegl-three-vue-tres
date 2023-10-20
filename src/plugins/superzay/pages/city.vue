<!-- eslint-disable vue/space-unary-ops -->
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-20 11:17:08
-->
<template>
	<TresCanvas v-bind="state">
		<TresPerspectiveCamera :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<belt v-if="showBuildingLines" :model="CityFBX">
			<buildingLines v-if="showBuildingLines" :builds="CityFBX.city" />
		</belt>
		<TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
		<TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three';
import { reactive, onMounted, watchEffect, ref } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import { loadCityFBX } from '../common/loadCity';

import belt from '../components/belt.vue';
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
	// if (beltRef.value) {
	// 	console.log(beltRef.value)
	// 	debugger
	// 	if (beltRef.value.cityBuildings) {
	// 		showBuildingLines.value = true
	// 	}
	// }
});
onMounted(() => {

})
</script>

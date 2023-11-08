<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 09:49:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-08 10:31:05
-->
<template>
	<!-- <loading></loading> -->
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<template v-if="props.showBuildings && cityFBX">
			<buildingsModel :model="cityFBX" />
			<buildingsLines :builds="cityFBX.city" color="#000" />
		</template>

		<slot name="ability"></slot>
		<TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
		<TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
	</TresCanvas>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		showBuildings?: boolean
		autoRotate?: boolean
	}>(),
	{
		showBuildings: true,
		autoRotate: true
	},
)

import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three';
import { reactive, ref } from 'vue';
import { TresCanvas, } from '@tresjs/core'; //useRenderLoop
import { OrbitControls } from '@tresjs/cientos';

import { loadCityFBX } from '../common/loadCity';
import buildingsModel from "./buildings/buildingsModelCustomShader.vue";// buildingsModelIncompatible buildingsModelShader buildingsModelCustomShader
import buildingsLines from "./buildings/buildingsLines.vue";

// import loading from './loading.vue'

const state = reactive({
	clearColor: '#000000',
	shadows: true,
	alpha: false,
	useLegacyLights: true,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
});
const controlsState = reactive({ autoRotate: props.autoRotate, enableDamping: true });

let cityFBX = null
if (props.showBuildings) {
	cityFBX = await loadCityFBX()
}

const perspectiveCameraRef = ref()
// const { onLoop } = useRenderLoop()
// onLoop(({ delta }) => {
// 	if (perspectiveCameraRef.value) {
// 		console.log(perspectiveCameraRef.value.position)
// 	}
// })
</script>
<style lang="less">
// #app {
// 	width: 100%;
// 	height: 100%;
// }
</style>
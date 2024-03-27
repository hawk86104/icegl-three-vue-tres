<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-27 21:56:36
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 1, 5]" :fov="30" :near="1" :far="1000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="2.5" />
		<!-- <TresDirectionalLight color="#ffffff" intensity="10.5" position="[-1, 1, 1]" /> -->

		<!-- <TresSpotLight :position="[0, 5, 0]" :angle="0.3" :penumbra="1" castShadow :intensity="2" :shadowBias="-0.0001" /> -->
		<Suspense>
			<carModel />
		</Suspense>
		<Suspense>
			<reflectorShaderMesh v-bind="configState" :position="[0, -0.6, 0]" />
		</Suspense>

		<environmentForLightformers />
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'

import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import { environmentForLightformers } from 'PLS/skyBox'
import carModel from '../components/carModel.vue'



const configState = reactive({
	reflectivity: 0.1,
	mirror: 0.92,	// 去除纹理 镜面化 
	mixStrength: 36,
	showGridHelper: false,
})

const state = reactive({
	clearColor: '#000',
	shadows: true,
})
const controlsState = reactive({
	autoRotate: true,
})

</script>
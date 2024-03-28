<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-28 10:24:22
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 1, 5]" :fov="30" :near="1" :far="1000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="2.5" />
		<!-- <TresDirectionalLight color="#ffffff" intensity="5" castShadow v-light-helper :position="[0, 3, 0]" /> -->
		<TresSpotLight ref="spotLight" :position="[0, 15, 0]" :angle="0.3" :penumbra="1" castShadow :intensity="2" />
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
import { reactive, ref, watchEffect } from 'vue'
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import * as THREE from 'three'

import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import { environmentForLightformers } from 'PLS/skyBox'
import carModel from '../components/carModel.vue'

const spotLight = ref(null as THREE.SpotLight | null)
watchEffect(() => {
	if (spotLight.value) {
		spotLight.value.shadow.mapSize.width = 1024
		spotLight.value.shadow.mapSize.height = 1024
		spotLight.value.shadow.camera.near = 1
		spotLight.value.shadow.camera.far = 100
		spotLight.value.shadow.bias = -0.0001
	}
})

const configState = reactive({
	reflectivity: 0.1,
	mirror: 0.92,	// 去除纹理 镜面化 
	mixStrength: 36,
	showGridHelper: false,
})

const state = reactive({
	clearColor: '#82839f',
	shadows: true,
	alpha: false,
	antialias: true,
	pixelRatio: window.devicePixelRatio,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.AgXToneMapping,
	useLegacyLights: true
})
const controlsState = reactive({
	autoRotate: true,
})

</script>
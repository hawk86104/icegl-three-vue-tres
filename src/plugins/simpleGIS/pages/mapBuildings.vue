<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-29 18:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:37:49
-->

<template>
	<TresCanvas v-bind="state" window-size>
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<tilesBuildings :position="[buildsPosition[0], 1, -buildsPosition[1] + 228]" :camera="camera" />

		<Suspense>
			<tileMapBuildingsMesh ref="tileMapBuildingsMeshRef" :bbox="[104.955976, 20.149765, 120.998419, 30.528687]"
				:mapCenter="mapCenter" :camera="camera"
/>
		</Suspense>

		<Suspense>
			<mapBuildingsMoreMeshes :cPosition="buildsPosition" />
		</Suspense>

		<TresGridHelper :args="[10000, 10]" />
		<TresAxesHelper :args="[100000]" />
	</TresCanvas>
	<raycasterEvent :tileMapRef="tileMapBuildingsMeshRef" />
</template>


<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import * as THREE from 'three'
import { tilesBuildings, tileMapBuildingsMesh } from 'PLS/simpleGIS'
import { lonLatToUtm } from '../lib/threeSatelliteMap/index'
import mapBuildingsMoreMeshes from '../components/mapBuildingsMoreMeshes.vue'
import raycasterEvent from '../components/raycasterEvent.vue'

// const wud = utmToLonLat(185500.52598346426, 2494899.945635518)
const buildsPosition = lonLatToUtm(113.942639739199, 22.53171672540276, 50)

const tileMapBuildingsMeshRef = shallowRef()
const state = reactive({
	clearColor: '#000000',
	renderMode: 'manual',
	alpha: false,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
})
const mapCenter = [buildsPosition[0], buildsPosition[1], 1700]

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1e7 * 10)
</script>
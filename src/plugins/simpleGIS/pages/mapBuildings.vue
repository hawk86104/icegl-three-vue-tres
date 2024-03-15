<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-29 18:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-15 21:48:17
-->

<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="new THREE.Vector3(mapCenter[0], mapCenter[2], -mapCenter[1])" :fov="60" :near="1"
			:far="1e8" :up="[0, 1, 0]" />

		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<tilesBuildings :position="[buildsPosition[0], 1, -buildsPosition[1] + 228]" />

		<Suspense>
			<tileMapBuildingsMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" />
		</Suspense>
		<radraA color="#00c0ff" :radius="300" :size="300" :position="[buildsPosition[0], 8, -buildsPosition[1]]" />
		<radraB :position="[buildsPosition[0] + 700, 10, -buildsPosition[1] + 300]" color="#ffff00" :height="180"
			:maxRadius="400" />

		<TresGridHelper :args="[10000, 10]" />
		<TresAxesHelper :args="[100000]" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import * as THREE from 'three'
import { tilesBuildings, tileMapBuildingsMesh } from 'PLS/simpleGIS'
import { radraA, radraB } from 'PLS/digitalCity'
import { lonLatToUtm } from '../lib/threeSatelliteMap/index'


// const wud = utmToLonLat(185500.52598346426, 2494899.945635518)
const buildsPosition = lonLatToUtm(113.942639739199, 22.53171672540276, 50)

const state = reactive({
	clearColor: '#000000',
	disableRender: true,
	alpha: false,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
})
const mapCenter = [buildsPosition[0], buildsPosition[1], 4700]
</script>
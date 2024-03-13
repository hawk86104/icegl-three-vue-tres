<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-29 18:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 21:00:01
-->

<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="new THREE.Vector3(mapCenter[0], mapCenter[1], mapCenter[2])" :fov="60" :near="1"
			:far="1e8" :up="[0, 0, 1]" />

		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
		<tilesBuildings :position="[185507.52598346426, 2494899.945635518, 21]" />

		<Suspense>
			<tileMapBuildingsMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import * as THREE from 'three'
import tilesBuildings from '../components/tilesBuildings.vue'
import tileMapBuildingsMesh from '../components/tileMapBuildingsMesh.vue'

const state = reactive({
	clearColor: '#000000',
	disableRender: true,
	alpha: false,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
})

const mapCenter = [185098.52598346426, 2494608.945635518, 4712.578125399592]
// const mapCenter = [400, 400, 400]
</script>
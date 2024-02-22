<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 13:38:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 17:38:18
-->
<template>
	<mapContainer :center="mapCenter" :zoom="18" :pitch="65.59312320916906" />
	<TresCanvas id="tresCanvas" ref="tcRef" v-bind="state">
		<TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" />
		<TresAmbientLight :intensity="0.5" />

		<!-- <TresMesh :position="[-100, -100, 500]">
			<TresBoxGeometry :args="[1000, 1000, 1000]" />
			<TresMeshNormalMaterial />
		</TresMesh> -->
		<mergeTres :center="mapCenter" />

		<Suspense>
			<buildingModels />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import mapContainer from "../components/mapContainer.vue"
import mergeTres from "../components/mergeTres.vue"

import buildingModels from '../components/buildingModels.vue'

const mapCenter = [121.449463, 31.174848]

const state = reactive({
	// windowSize: true,
	alpha: true,
	antialias: true,
	autoClear: false,
	disableRender: true,
})

</script>

<style scoped>
#tresCanvas {
	/* z-index: -1 !important; */
}
</style>
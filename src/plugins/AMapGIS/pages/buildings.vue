<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 13:38:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:42:01
-->
<template>
	<mapContainer :center="mapCenter" :zoom="19" :pitch="65.59312320916906" mapStyle="darkblue" />
	<TresCanvas id="tresCanvas" ref="tcRef" v-bind="state">
		<TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" />
		<TresAmbientLight :intensity="0.5" />

		<mergeTres :center="mapCenter" />

		<Suspense>
			<buildingModels />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import mapContainer from "../components/mapContainer.vue"
import mergeTres from "../components/mergeTres.vue"

import buildingModels from '../components/buildingModels.vue'

const mapCenter = [121.407867, 31.157717]

const state = reactive({
	// windowSize: true,
	alpha: true,
	antialias: true,
	autoClear: false,
	renderMode: 'manual'
})

</script>

<style scoped>
#tresCanvas {
	/* z-index: -1 !important; */
}
</style>
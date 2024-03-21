<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 13:38:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 09:17:25
-->
<template>
	<mapContainer :center="mapCenter" />
	<TresCanvas id="tresCanvas" ref="tcRef" v-bind="state">
		<TresPerspectiveCamera :fov="60" :near="0.1" :far="1000" />
		<TresAmbientLight :intensity="0.5" />

		<TresMesh :position="[0, 0, 500]">
			<TresBoxGeometry :args="[1000, 1000, 1000]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<mergeTres :center="mapCenter" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import mapContainer from "../components/mapContainer.vue"
import mergeTres from "../components/mergeTres.vue"

const mapCenter = [116.52, 39.79]

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
	z-index: -1 !important;
}
</style>
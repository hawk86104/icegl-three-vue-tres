
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="mapCenter" :fov="60" :near="1" :far="1e8" :look-at="[mapCenter[0], mapCenter[1], 0]"
			:up="[0, 0, 1]" />

		<TresAmbientLight :intensity="0.5" />
		<TresDirectionalLight :position="[1, 2, 3]" :intensity="1.25" />
		<tilesBuildings :position="[185465.52598346426, 2494900.945635518, 21]" />

		<Suspense>
			<tileMapMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import tilesBuildings from '../components/tilesBuildings.vue'
import tileMapMesh from '../components/tileMapMesh.vue'

const state = reactive({
	clearColor: '#201919',
	disableRender: true,
})

const mapCenter = [185098.52598346426, 2494608.945635518, 4712.578125399592]
// const mapCenter = [400, 400, 400]
</script>
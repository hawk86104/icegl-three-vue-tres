<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:03:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-26 17:57:48
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="mapCenter" :fov="60" :near="1" :far="1e8"
			:look-at="[mapCenter[0], mapCenter[1], 0]" />
		<Suspense>
			<tileMapMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import tileMapMesh from '../components/tileMapMesh.vue'

const state = reactive({
	clearColor: '#201919',
	// alpha: false,
	logarithmicDepthBuffer: true,
	antialias: true,
	disableRender: true,
})

const mapCenter = [666975.9502699381, 3547712.254078843, 13137.654582887653]

</script>
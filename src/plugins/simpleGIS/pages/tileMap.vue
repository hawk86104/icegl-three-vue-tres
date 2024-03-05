<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:03:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-05 18:03:12
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="new THREE.Vector3(mapCenter[0], mapCenter[1], mapCenter[2])" :fov="60" :near="1" :far="1e8" :look-at="[mapCenter[0], mapCenter[1], 0]" :up="[0, 0, 1]" />
		<Suspense>
			<tileMapMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import * as THREE from 'three'
import tileMapMesh from '../components/tileMapMesh.vue'

const state = reactive({
	clearColor: '#201919',
	logarithmicDepthBuffer: true,
	antialias: true,
	disableRender: true,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
})

const mapCenter = [958792.6688235556, 2771848.203330192, 1241.0896440063382]
</script>
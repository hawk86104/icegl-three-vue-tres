<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:03:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-15 22:09:11
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="new THREE.Vector3(mapCenter[0], mapCenter[2], -mapCenter[1])" :fov="60" :near="1"
			:far="1e8" :look-at="[mapCenter[0], 0, -mapCenter[1]]" :up="[0, 1, 0]" />
		<Suspense>
			<tileMapMesh :bbox="[104.955976, 20.149765, 120.998419, 30.528687]" v-bind="tileMapState" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import tileMapMesh from '../components/tileMapMesh.vue'
import { lonLatToWebMerctor } from '../lib/threeSatelliteMap/index'

const tileMapState = reactive({
	opposite: true,
	genBright: 1.3,
	genContrast: 1,
	genSaturation: 1,
	isMonochrome: true,
	monochrome: '#4688b5',
})

const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(tileMapState, 'opposite', { label: '反色' })
paneControl.addBinding(tileMapState, 'genBright', {
	label: '高亮', min: 0.1,
	max: 3,
	step: 0.1,
})
paneControl.addBinding(tileMapState, 'genContrast', {
	label: '对比度', min: 0.1,
	max: 3,
	step: 0.1,
})
paneControl.addBinding(tileMapState, 'genSaturation', {
	label: '饱和度', min: 0.1,
	max: 3,
	step: 0.1,
})
paneControl.addBinding(tileMapState, 'isMonochrome', { label: '单色滤镜' })
paneControl.addBinding(tileMapState, 'monochrome', { label: '滤镜颜色' })

const state = reactive({
	clearColor: '#201919',
	antialias: true,
	logarithmicDepthBuffer: true,
	disableRender: true,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
	precision: 'highp'
})

//const mapCenter = webMercatorToLonLat(13222524.44100642, 3765560.203675016)
const positionUtm = lonLatToWebMerctor(118.779958, 32.017136)

const mapCenter = [positionUtm[0], positionUtm[1], 5000]
</script>
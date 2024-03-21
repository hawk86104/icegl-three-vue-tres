<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-07 08:30:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-08 11:27:17
-->

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane';
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import { reactive, watchEffect, ref } from 'vue';
import heatmapJS from '../components/heatmapJS.vue'

const gl = {
	clearColor: '#030311',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	shadowMapType: PCFSoftShadowMap,
	useLegacyLights: true,
	antialias: true,
}
const heatmapJSRef = ref()
let play = true
useRenderLoop().onLoop(({ elapsed }) => {
	if (!play && parseInt(elapsed) % 2 == 1) {
		play = true
		if (heatmapJSRef.value) {
			heatmapJSRef.value.setData()
		}
	}
	if (play && parseInt(elapsed) % 2 == 0) {
		play = false
	}

})
const typeState = reactive({
	show2dCanvas: true,
	heightRatio: 6,
})
const paneControl = new Pane({
	title: '参数',
	expanded: true,
});
paneControl.addBinding(typeState, 'show2dCanvas', {
	label: '显示二维图'
})
paneControl.addBinding(typeState, 'heightRatio', {
	label: '高度', min: 1,
	max: 10,
	step: 1,
})
</script>

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[21, 34, 55]" :fov="60" :near="1" :far="1000" />
		<OrbitControls :autoRotate="true" :autoRotateSpeed="2" />
		<TresAmbientLight color="#cccccc" :intensity="0.4" />
		<TresPointLight color="#ffffff" :intensity="0.8" />
		<TresGridHelper :args="[50, 25]" :position="[0, 0, 0]" />
		<heatmapJS ref="heatmapJSRef" v-bind="typeState" />
	</TresCanvas>
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 09:54:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-11 11:09:18
-->
<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[30, 30, 100]" />
		<OrbitControls />

		<Sky :turbidity="10" :rayleigh="2" :mieDirectionalG="0.8" :elevation="sktState.elevation" :distance="10000"
			:azimuth="sktState.azimuth" />
		<Suspense>
			<threeExampleOcean v-bind="teoState" />
		</Suspense>

	</TresCanvas>
</template>

<script setup lang="ts">

import { Sky, OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import threeExampleOcean from "../components/threeExampleOcean.vue";
const gl = {
	clearColor: '#222',
	shadows: true,
	alpha: false,
}
const teoState = reactive({
	size: 1,
	distortionScale: 3.7
})
const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(teoState, 'distortionScale', {
	label: '水变化尺度', min: 0,
	max: 8,
	step: 0.1,
})
paneControl.addBinding(teoState, 'size', {
	label: '水精细度', min: 0.1,
	max: 10,
	step: 0.1,
})
const sktState = reactive({
	elevation: 2,
	azimuth: 180
})
paneControl.addBinding(sktState, 'elevation', {
	label: '太阳地平线高', min: 0.1,
	max: 10,
	step: 0.1,
})
paneControl.addBinding(sktState, 'azimuth', {
	label: '太阳地方位角', min: 0,
	max: 360,
	step: 1,
})
</script>
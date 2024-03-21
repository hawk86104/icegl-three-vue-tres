<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[10, 10, 10]" />
		<TresAmbientLight :intensity="1" />
		<OrbitControls />
		<TresGridHelper :args="[10, 10]" />
		<tilingCaustics v-bind="{ ...typeState }" />
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue';
import tilingCaustics from '../components/tilingCaustics.vue'
import { Pane } from 'tweakpane';
const gl = {
	clearColor: '#222',
}
const typeState = reactive({
	color: "#fff",
	speed: 0.1,
	brightness: 1.5,
	flowSpeed: { x: 0.01, y: 0.01 }
})
const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(typeState, 'color', {
	label: '颜色'
})
paneControl.addBinding(typeState, 'speed', {
	label: '速度', min: 0.1,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(typeState, 'brightness', {
	label: '亮度', min: 0.1,
	max: 2,
	step: 0.1,
})
paneControl.addBinding(typeState, 'flowSpeed', {
	label: '流动速度',
	picker: 'inline',
	expanded: true,
	x: { min: 0.01, step: 0.02, max: 0.6, inverted: true },
	y: { min: 0.01, step: 0.02, max: 0.6, inverted: true },
});
</script>
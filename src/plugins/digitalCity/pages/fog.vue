<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-12 11:37:10
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<fog v-bind="fogState" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import fog from '../components/fog/index.vue'
import { Pane } from 'tweakpane'
import { reactive } from 'vue'

const fogState = reactive({
	type: 'Fog',
	color: "#000",
	density: 0.001,
	near: 100,
	far: 4000,
})

const pane = new Pane()
pane.addBlade({
	view: 'list',
	label: '类型',
	options: [
		{ text: '普通雾', value: 'Fog' },
		{ text: '雾Exp2', value: 'FogExp2' },
	],
	value: 'Fog',
}).on('change', (ev) => {
	fogState.type = ev.value

	pane.children[2].hidden = ev.value === 'Fog'
	pane.children[3].hidden = ev.value === 'FogExp2'
	pane.children[4].hidden = ev.value === 'FogExp2'
})
pane.addBinding(fogState, 'color', { label: '颜色' })
pane.addBinding(fogState, 'density', {
	label: '密度', min: 0.00025,
	max: 0.001,
	step: 0.0001,
})
pane.children[2].hidden = true
pane.addBinding(fogState, 'near', {
	label: '最小距离', min: 100,
	max: 1000,
	step: 10,
})
pane.addBinding(fogState, 'far', {
	label: '最大距离', min: 1000,
	max: 10000,
	step: 100,
})
</script>

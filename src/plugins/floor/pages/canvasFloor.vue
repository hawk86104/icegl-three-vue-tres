<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 11:10:04
-->
<template>
	<TresCanvas clearColor="#000000" window-size>
		<TresPerspectiveCamera :position="[15, 20, 0]" :fov="45" :near="0.1" :far="10000" />
		<OrbitControls enableDamping auto-rotate />
		<TresAmbientLight :intensity="6.0" />

		<TresDirectionalLight :position="[0, 8, 0]" :intensity="1" color="#fff" />

		<TresMesh :position="[0, 1, 0]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<lightningPattern v-bind="canvasState" />

		<TresAxesHelper :args="[10]" :position="[0, 0, 0]" />
		<TresGridHelper :args="[10, 10]" :position="[0, 0, 0]" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import lightningPattern from '../components/lightningPattern.vue'

const canvasState = reactive({
	color: "#1a79fe",
	opacity: 0.95,
	speed: 10,
})
const paneControl = new Pane({
	title: 'canvas地面',
	expanded: true,
})
paneControl.addBinding(canvasState, 'color', { label: '颜色' })
paneControl.addBinding(canvasState, 'opacity', {
	label: '透明度', min: 0.0,
	max: 1.0,
	step: 0.01,
})
paneControl.addBinding(canvasState, 'speed', {
	label: '速度', min: 0,
	max: 20.0,
	step: 1,
})

</script>
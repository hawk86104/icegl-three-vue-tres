<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 08:09:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 08:10:12
-->

<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[-15, 15, -15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<TresMesh :position="[3, 1, 0]">
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial :wireframe="true" />
		</TresMesh>

		<TresMesh :position="[0, 2, 4]" ref="cube">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<Suspense>
			<reflectorDUDV v-bind="configState" :ignoreObjects="[cube]" />
		</Suspense>

		<TresMesh :position="[3, -1.5, 2]">
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial />
		</TresMesh>
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'
import { reactive, ref } from 'vue'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'

const configState = reactive({
	reflectivity: 2.6,
	showGridHelper: true
})

const paneControl = new Pane({
	title: '镜面参数',
	expanded: true,
})
paneControl.addBinding(configState, 'reflectivity', {
	label: '反射率',
	min: 0.0,
	max: 10.0,
	step: 0.1,
})
paneControl.addBinding(configState, 'showGridHelper', { label: '显示网格' })

const cube = ref(null)
</script>
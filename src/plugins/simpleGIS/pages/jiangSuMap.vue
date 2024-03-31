<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-05 12:42:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-31 12:12:42
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[0, 12, 0]" :fov="75" :near="0.1" :far="1000" :up="[0, 0, -1]" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight :intensity="8.8" />
		<TresDirectionalLight :position="[0, 10, 5]" :intensity="0.2" />
		<TresDirectionalLight :position="[0, 10, -5]" :intensity="0.2" />
		<TresDirectionalLight :position="[5, 10, 0]" :intensity="0.2" />
		<TresDirectionalLight :position="[-5, 10, 0]" :intensity="0.2" />
		<TresGridHelper :args="[20, 10]" />
		<Suspense>
			<jiangSuMapMesh />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import jiangSuMapMesh from '../components/jiangSuMapMesh.vue'

const state = reactive({
	clearColor: '#ffdbd1',
	alpha: true,
	antialias: true
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
	makeDefault: true,
})

</script>
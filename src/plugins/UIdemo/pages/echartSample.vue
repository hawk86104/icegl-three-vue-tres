<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:08:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-19 18:31:09
-->

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'

// import debugChart from '../components/echarts/debugChart.vue'

import spriteChart from '../components/echarts/spriteChart.vue'
import meshChart from '../components/echarts/meshChart.vue'
import animationChart from '../components/echarts/animationChart.vue'
</script>

<template>
	<TresCanvas clearColor="#000000" window-size>
		<TresPerspectiveCamera :position="[2, -6, 12]" />
		<OrbitControls />
		<TresMesh :position="[-2.5, -1, -1]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
		</TresMesh>
		<spriteChart :position="[-2.5, 1, -1]" />

		<TresMesh :position="[2.5, -0.6, -1]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
		</TresMesh>
		<meshChart :position="[2.5, 2, -1]" :renderOrder="1" />

		<TresMesh :position="[1, -7, -1]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
		</TresMesh>
		<animationChart :position="[1.5, -4, -1]" :renderOrder="2" />
	</TresCanvas>

	<!-- <debugChart /> -->
</template>

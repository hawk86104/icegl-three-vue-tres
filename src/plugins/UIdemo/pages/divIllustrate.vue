<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 17:54:48
-->
<template>
	<TresCanvas clearColor="#333" window-size>
		<TresPerspectiveCamera :position="[-500, 330, 500]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls />
		<TresAmbientLight color="#ffffff" intensity="1" />
		<TresDirectionalLight color="#ffffff" :position="[300, 300, 250]" :intensity="6" />

		<Suspense>
			<modelVue />
		</Suspense>

		<Suspense>
			<reflectorShaderMesh v-bind="configState" />
		</Suspense>

		<illustratePropeller />
		<illustrateWing />

	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import modelVue from '../components/model.vue'
import illustratePropeller from '../components/illustratePropeller.vue'
import illustrateWing from '../components/illustrateWing.vue'

const configState = reactive({
	reflectivity: 0.941,
	mirror: 113.25,
	mixStrength: 12,
	showGridHelper: true,
	scale: 100.0
})


</script>

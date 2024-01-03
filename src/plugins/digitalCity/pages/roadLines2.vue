<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 09:49:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-03 09:07:08
-->
<template>
	<TresCanvas shadows window-size clearColor="#000">
		<TresPerspectiveCamera :position="[0.5, 2, 1.5]" :fov="45" :near="0.1" :far="100000" />
		<OrbitControls />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[0, 3, 3]" :intensity="2" color="#ffffff" v-light-helper cast-shadow
			:shadow-mapSize-width="1024" :shadow-mapSize-height="1024" />

		<Suspense>
			<buildingsMode />
		</Suspense>
		<TresGridHelper :args="[6, 10]" :position="[0, 0, 0]" />
	</TresCanvas>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import buildingsMode from '../components/newBuildingsModel/buildingsMode.vue'

</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 08:09:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-22 19:59:36
-->

<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<TresDirectionalLight :position="[0, 10, 0]" :intensity="10" v-light-helper color="#ffffff" />
		<Box :args="[1, 1, 1]" color="orange" :position="[3, 0, 0]" />
		<TresMesh :position="[0, 2, -4]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>
		<Suspense>
			<reflectorShaderMesh />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper, Box } from '@tresjs/cientos'
import reflectorShaderMesh from '../components/reflectorShaderMesh.vue'



</script>
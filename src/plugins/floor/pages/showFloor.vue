<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-21 17:39:17
-->
<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="100000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<TresDirectionalLight :position="[0, 20, 0]" :intensity="100" v-light-helper color="#ffffff" />
		<Suspense>
			<sfm :scale="[10, 0.2, 10]" :position="[0, -3, 0]" />
		</Suspense>
		<!-- <reflectorMesh /> -->
		<TresGridHelper />
	</TresCanvas>
</template>


<script setup lang="ts">
// import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import sfm from '../components/sciFiModular.vue'
// import reflectorMesh from '../components/reflectorMesh.vue'


</script>
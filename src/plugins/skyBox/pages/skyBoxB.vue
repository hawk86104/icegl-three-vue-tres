<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-26 15:21:43
-->

<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />

		<Box :args="[3, 3, 3]" color="orange" :position="[3, 2, 1]" cast-shadow />
		<TresMesh :position="[0, 2, -4]" cast-shadow>
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<!-- <TresMesh :position="[0, 0, 0]">
			<TorusKnotGeometry :args="[3, 1, 64, 8, 2, 3]" />
			<MeshStandardMaterial color="0xffffff" :metalness='1' :roughness="0.14" />
		</TresMesh> -->

		<Suspense>
			<skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"

import { OrbitControls, Box } from '@tresjs/cientos'

import skyBox from 'PLS/skyBox/components/skyBoxBmesh.vue'

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

</script>
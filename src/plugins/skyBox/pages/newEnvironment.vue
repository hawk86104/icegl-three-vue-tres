<!--
 * @Description:  preset="shangai"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-07 14:29:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-08 12:16:04
-->
<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="0.5" />

		<TresMesh :position="[3, 2, 1]" cast-shadow>
			<TresBoxGeometry :args="[3, 3, 3]" />
			<TresMeshStandardMaterial color="#ffffff" :metalness="1" :roughness="0.14" />
		</TresMesh>

		<TresMesh :position="[0, 2, -4]" cast-shadow>
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<Suspense>
			<Environment :blur="1" background>
				<TresMesh :scale="[100, 100, 100]">
					<TresSphereGeometry :args="[1, 64, 64]" />
					<LayerMaterial :side="THREE.BackSide">
						<Color color="#444" :alpha="1.0" mode="normal" />
						<Depth colorA="blue" colorB="black" :alpha="0.5" mode="normal" :near="0" :far="300"
							:origin="new THREE.Vector3(100, 100, 100)" />
					</LayerMaterial>
				</TresMesh>
			</Environment>
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"
import { LayerMaterial, Color, Depth } from 'PLS/basic/components/forCientos/LayerMaterial'
import { OrbitControls } from '@tresjs/cientos'

import Environment from 'PLS/basic/components/forCientos/useEnvironment/component.vue'

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

</script>
<!--
 * @Description:  preset="shangai"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-07 14:29:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 16:24:24
-->
<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="0.5" />

		<TresMesh :position="[3, 2, 1]" cast-shadow>
			<TresBoxGeometry :args="[10, 10, 10]" />
			<TresMeshStandardMaterial color="#ffffff" :metalness="1" :roughness="0.14" />
		</TresMesh>

		<TresMesh :position="[0, 2, -4]" cast-shadow>
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<Suspense>
			<Environment :blur="1" background :far="10000" preset="city">
				<TresGroup v-if="true">
					<Lightformer :intensity="0.75" :rotation-x="Math.PI / 2" :position="[0, 5, -9]" :scale="[10, 10, 1]" />
					<Lightformer :intensity="4" :rotation-y="Math.PI / 2" :position="[-5, 1, -1]" :scale="[20, 0.1, 1]" />
					<Lightformer :rotation-y="Math.PI / 2" :position="[-5, -1, -1]" :scale="[20, 0.5, 1]" />
					<Lightformer :rotation-y="-Math.PI / 2" :position="[10, 1, 0]" :scale="[20, 11, 1]" />
					<Levioso :speed="5" :floatFactor="2" :rotationFactor="2">
						<Lightformer form="ring" color="red" :intensity="1" :scale="10" :position="[-15, 4, -18]" />
					</Levioso>

					<TresGroup :rotation="[0, 0.5, 0]">
						<TresGroup ref="group">
							<Lightformer v-for="( i, x ) in lightFormerPositions " :key="i" form="circle" :intensity="2"
								:rotation="[Math.PI / 2, 0, 0]" :position="[x, 4, i * 4]" :scale="[3, 1, 1]" />
						</TresGroup>
					</TresGroup>

					<TresMesh :scale="[100, 100, 100]">
						<TresSphereGeometry :args="[1, 64, 64]" />
						<LayerMaterial :side="THREE.BackSide">
							<Color color="#444" :alpha="1.0" mode="normal" />
							<Depth colorA="blue" colorB="black" :alpha="0.5" mode="normal" :near="0" :far="300"
								:origin="new THREE.Vector3(100, 100, 100)" />
						</LayerMaterial>
					</TresMesh>
				</TresGroup>
			</Environment>
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { ref } from "vue"
import * as THREE from "three"
import { useRenderLoop } from '@tresjs/core'
import { LayerMaterial, Color, Depth } from 'PLS/basic/components/forCientos/LayerMaterial'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

const lightFormerPositions = [2, 0, 2, 0, 2, 0, 2, 0]
const group = ref(null)

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
	if (group.value) {
		// @ts-ignore
		(group.value.position.z += delta * 10) > 20 && (group.value.position.z = -60)
	}
})
</script>
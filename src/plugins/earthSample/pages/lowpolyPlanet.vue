<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-13 09:04:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 19:54:32
-->
<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls, Stars } from '@tresjs/cientos'
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

import loading from 'PLS/UIdemo/components/loading/default.vue'
import Planet from '../components/lowpolyPlanet/planet.vue'

const gl = {
	clearColor: '#11101B',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	shadowMapType: PCFSoftShadowMap,
	useLegacyLights: true,
}
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
	yRotation.value += 0.02 * delta
})
</script>

<template>
	<loading />
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[0, 1, 5]" :fov="75" :near="0.1" :far="1000" />
		<OrbitControls />

		<TresAmbientLight color="#484068" :intensity="1" />
		<Suspense>
			<Planet />
		</Suspense>
		<Stars :rotation="[0, yRotation, 0]" :radius="50" :depth="50" :count="5000" :size="0.3" :size-attenuation="true" />
		<TresPointLight color="#1BFFEF" :position="[0, 0, -8]" :intensity="80" cast-shadow />
		<TresDirectionalLight :position="[0, 2, 4]" :intensity="3" cast-shadow :shadow-mapSize-width="2048"
			:shadow-mapSize-height="2048" />
	</TresCanvas>
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-01 09:49:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 19:02:55
-->
<script setup lang="ts">
import { ref } from 'vue';
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'

import loading from 'PLS/UIdemo/components/loading/default.vue'

import starts from '../components/earthA/starts.vue'
import earthmap from '../components/earthA/earthmap.vue'
import lightlinepoint from '../components/earthA/lightlinepoint.vue'
import moon from '../components/earthA/moon.vue'

const gl = {
	clearColor: '#030311',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	shadowMapType: PCFSoftShadowMap,
	useLegacyLights: true,
}
const yRotation = ref(0)
useRenderLoop().onLoop(({ delta }) => {
	yRotation.value += 0.02 * delta
})
</script>

<template>
	<loading />
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[0, 50, 300]" :fov="45" :near="0.1" :far="100000" />
		<OrbitControls :autoRotate="true" :autoRotateSpeed="2" />
		<starts />
		<Suspense>
			<earthmap />
		</Suspense>
		<Suspense>
			<lightlinepoint />
		</Suspense>
		<Suspense>
			<moon />
		</Suspense>
		<TresAmbientLight color="#484068" :intensity="1" />
	</TresCanvas>
</template>

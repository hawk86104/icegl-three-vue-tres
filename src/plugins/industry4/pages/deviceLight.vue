<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-18 18:55:31
-->
<template>
	<TresCanvas v-bind="state" window-size ref="CanvasRef">
		<TresPerspectiveCamera :position="[15, 15, 15]" ref="PCameraRef" :fov="45" :near="1" :far="1000" />
		<!-- 3.025669715883166, 0, -2.812027151791605 -->
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="40" />
		<TresDirectionalLight ref="DirectionalLightRef" :position="[0, 2, -4]" :intensity="1" />
		<Suspense>
			<device />
		</Suspense>
		<TresGridHelper :args="[10, 10]" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping, MeshBasicMaterial, Layers, Group } from 'three'
import { reactive, ref, watchEffect, watch } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import device from '../components/device.vue'

const state = reactive({
	clearColor: '#000',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})
const controlsState = reactive({
	autoRotate: true,
})
const DirectionalLightRef = ref()
const PCameraRef = ref()
const CanvasRef = ref()

</script>
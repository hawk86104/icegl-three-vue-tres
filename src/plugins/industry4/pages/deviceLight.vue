<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-18 19:53:20
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="1" :far="1000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="40" />
		<TresDirectionalLight :position="[0, 2, -4]" :intensity="1" />
		<Suspense>
			<device />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
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

</script>
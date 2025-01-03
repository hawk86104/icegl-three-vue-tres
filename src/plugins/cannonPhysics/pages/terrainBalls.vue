<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-30 11:15:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-03 08:38:12
-->
<template>
	<TresCanvas v-bind="state" window-size>
			<TresPerspectiveCamera :position="[110, 70, 20]" :fov="45" :near="0.1" :far="1000" />
			<OrbitControls v-bind="controlsState" />
			<TresAmbientLight :intensity="2" />

			<TresDirectionalLight ref="TDirectionalLight" :position="[10, 8, 4]" :intensity="2" cast-shadow />
			<TresDirectionalLight :position="[10, 2, 4]" :intensity="2" cast-shadow />

			<terrainBallsThree />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, shallowRef, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import terrainBallsThree from '../components/terrainBallsThree.vue'

const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,

	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
	enableZoom: true,
	autoRotate: false,
})

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
			TDirectionalLight.value.shadow.mapSize.set(1000, 1000)
			TDirectionalLight.value.shadow.camera.near = 0.5
			TDirectionalLight.value.shadow.camera.far = 50000
			TDirectionalLight.value.shadow.camera.top = 20
			TDirectionalLight.value.shadow.camera.right = 20
			TDirectionalLight.value.shadow.camera.left = -20
			TDirectionalLight.value.shadow.camera.bottom = -20
	}
})
</script>

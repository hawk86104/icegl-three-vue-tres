<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:56:54
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="1" :far="1000" />
		<OrbitControls v-bind="controlsState" />
		<Suspense>
			<device v-bind="deviceState" />
		</Suspense>
		<Suspense>
			<reflectorShaderMesh v-bind="configState" :position="[0, -1, 0]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import device from '../components/device.vue'

const configState = reactive({
	reflectivity: 0.1,
	mirror: 0.92,	// 去除纹理 镜面化 
	mixStrength: 36,
	showGridHelper: false,
})

const state = reactive({
	clearColor: '#000',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
	disableRender: true
})
const controlsState = reactive({
	autoRotate: true,
})

const deviceState = reactive({
	threshold: 0.37,				// 阈值
	strength: 1.6,    // 强度
	radius: 0.1,       // 半径
})
</script>
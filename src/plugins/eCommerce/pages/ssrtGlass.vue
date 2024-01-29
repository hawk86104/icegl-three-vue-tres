<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-29 16:51:50
-->

<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[12, 12, 12]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<Suspense>
			<whiteFloorMesh v-bind="flootrConfigState" />
		</Suspense>

		<Suspense>
			<!-- <ssrtGlassMesh modelPath="./plugins/basic/htmls/model/model.gltf" modelName="Macbook" -->
			<ssrtGlassMesh :scale="2"
				modelPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb"
				modelName="statue"
				skyBoxTexture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>

		<Suspense>
			<skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import whiteFloorMesh from 'PLS/floor/components/whiteFloorMesh.vue'
import skyBox from 'PLS/skyBox/components/skyBoxAmesh.vue'
import { reactive } from 'vue'

import ssrtGlassMesh from "../components/ssrtGlassMesh.vue"

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
	// disableRender: true
}

const flootrConfigState = reactive({
	size: [20, 20],
	color: '#cbcb96',
	shadowColor: '#b8b59e',
	edge: 0.35
})

</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-25 11:30:24
-->

<template>
	<TresCanvas clearColor="#201919" window-size shadows>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />
		<TresDirectionalLight ref="TDirectionalLight" :position="[0, 10, 10]" :intensity="1" v-light-helper color="#ffffff"
			cast-shadow />
		<Box :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" cast-shadow />
		<TresMesh :position="[0, 2, -4]" cast-shadow>
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<Suspense>
			<whiteFloorMesh />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper, Box } from '@tresjs/cientos'
import whiteFloorMesh from '../components/whiteFloorMesh.vue'
import { shallowRef, watchEffect } from 'vue'

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(1024, 1024)
		TDirectionalLight.value.shadow.camera.near = 0.1
		TDirectionalLight.value.shadow.camera.far = 5000
		// TDirectionalLight.value.shadow.camera.top = 500
		// TDirectionalLight.value.shadow.camera.right = 500
		// TDirectionalLight.value.shadow.camera.left = -500
		// TDirectionalLight.value.shadow.camera.bottom = -500
		TDirectionalLight.value.shadow.radius = 10
	}
})
</script>
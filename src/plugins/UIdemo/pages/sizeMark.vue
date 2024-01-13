<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-13 11:20:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-13 13:09:03
-->

<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import modelVue from '../components/model.vue'
import floorText from '../components/floorText.vue'

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(1200, 1200)
		TDirectionalLight.value.shadow.camera.near = 0.1
		TDirectionalLight.value.shadow.camera.far = 5000
		TDirectionalLight.value.shadow.camera.top = 500
		TDirectionalLight.value.shadow.camera.right = 500
		TDirectionalLight.value.shadow.camera.left = -500
		TDirectionalLight.value.shadow.camera.bottom = -500
		TDirectionalLight.value.shadow.radius = 2
	}
})
</script>

<template>
	<TresCanvas clearColor='#999' window-size shadows>
		<TresPerspectiveCamera :position="[-0, 1000, 0]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls />
		<TresAmbientLight color="#ffffff" intensity="2" />
		<TresDirectionalLight color="#ffffff" :position="[260, 260, 350]" :intensity="10" cast-shadow v-light-helper
			ref="TDirectionalLight" />

		<Suspense>
			<modelVue />
		</Suspense>

		<Suspense>
			<floorText />
		</Suspense>


	</TresCanvas>
</template>



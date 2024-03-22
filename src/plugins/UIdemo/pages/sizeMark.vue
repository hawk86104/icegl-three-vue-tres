<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-13 11:20:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:46:55
-->

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import { shallowRef, watchEffect } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import modelVue from '../components/model.vue'
import floorText from '../components/floorText.vue'
import arrow25D from '../components/arrow2.5D.vue'

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(2048, 2048)
		TDirectionalLight.value.shadow.camera.near = 0.1
		TDirectionalLight.value.shadow.camera.far = 5000
		TDirectionalLight.value.shadow.camera.top = 500
		TDirectionalLight.value.shadow.camera.right = 500
		TDirectionalLight.value.shadow.camera.left = -500
		TDirectionalLight.value.shadow.camera.bottom = -500
		TDirectionalLight.value.shadow.radius = 2
	}
})

const controlsState = {
	enableDamping: true,
	dampingFactor: 0.05,
	autoRotate: true,
	autoRotateSpeed: 2,
}
</script>

<template>
	<loading />
	<TresCanvas clearColor="#999" window-size shadows>
		<TresPerspectiveCamera :position="[-100, 800, 500]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#ffffff" intensity="2" />
		<TresDirectionalLight ref="TDirectionalLight" color="#ffffff" :position="[260, 260, 350]" :intensity="6"
			cast-shadow />

		<Suspense>
			<modelVue />
		</Suspense>

		<Suspense>
			<floorText />
		</Suspense>

		<Suspense>
			<arrow25D :position="[230, 10, 0]" :scale="30" text="长:86m" :textRotation="[-Math.PI / 5, 0, 0]" />
		</Suspense>
		<Suspense>
			<arrow25D :position="[0, 10, 230]" :scale="30" text="宽:62m" :rotation="[0, -Math.PI / 2, Math.PI / 5]" :zRoom="3"
				:textRotation="[-Math.PI / 5, Math.PI / 2, Math.PI / 5]" :arrScale="[2, 2, 0.4]" />
		</Suspense>

		<Suspense>
			<arrow25D :position="[-230, 96, 0]" :scale="30" text="高:46m" :rotation="[Math.PI / 2, 0, 0]" :zRoom="2"
				:arrScale="[2, 2, 0.4]" :textRotation="[-Math.PI / 1.5, 0, 0]" />
		</Suspense>
	</TresCanvas>
</template>

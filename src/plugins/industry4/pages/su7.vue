<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 11:45:28
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[0, 2, 5]" :fov="45" :near="0.1" :far="500" />
		<OrbitControls v-bind="controlsState" />
		<!-- <TresAmbientLight color="#ffffff" intensity="10" />
		<TresDirectionalLight :position="[0, 2, -4]" :intensity="1" /> -->

		<Suspense>
			<startroom ref="startroomRef" />
		</Suspense>

		<Suspense>
			<car />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { randomLoading as loading } from 'PLS/UIdemo'
import startroom from '../components/su7/startroom.vue'
import car from '../components/su7/car.vue'

// import * as THREE from 'three'

const state = reactive({
	clearColor: '#000',
	antialias: false,
	// logarithmicDepthBuffer: true, // 开启后，镜面反射底部会透明过来
	// disableRender: true
})
const controlsState = reactive({
	// autoRotate: true,
})

const startroomRef = ref(null)

</script>
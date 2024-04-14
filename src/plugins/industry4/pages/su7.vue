<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-14 22:34:03
-->
<template>
	<!-- <loading /> -->
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

		<Suspense>
			<reflectorDUDV :reflectivity="0.1" :showGridHelper="false" :position-y=".02" :size="[8, 6]"
				:ignoreObjects="startroomRef?.meshList" />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import startroom from '../components/su7/startroom.vue'
import car from '../components/su7/car.vue'

import { reflectorDUDV } from 'PLS/floor'
// import { Environment, Lightformer } from 'PLS/basic'
// import * as THREE from 'three'
// import { randomLoading as loading } from 'PLS/UIdemo'
// import { reflectorDUDV } from 'PLS/floor'
// import lamboModel from '../components/lamboModel.vue'
// import lamboEffect from '../components/lamboEffect.vue'

const state = reactive({
	clearColor: '#000',
	antialias: false,
	// logarithmicDepthBuffer: true, // 开启后，镜面反射底部会透明过来
	disableRender: false
})
const controlsState = reactive({
	autoRotate: true,
})

const startroomRef = ref(null)

</script>
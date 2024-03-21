<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:41:29
-->
<template>
	<loading />
	<TresCanvas clearColor="#333" shadows window-size>
		<TresPerspectiveCamera :position="[500, 330, 500]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls />
		<TresAmbientLight color="#ffffff" intensity="1" />
		<!-- <TresGridHelper :position="[0, 1, 0]" :args="[500, 10]" /> -->
		<TresDirectionalLight ref="TDirectionalLight" color="#ffffff" :position="[300, 300, 350]" :intensity="6"
			cast-shadow />
		<Suspense>
			<planeClipping />
		</Suspense>
		<reflectorMesh v-bind="configState" />
	</TresCanvas>
</template>


<script setup lang="ts">
import { shallowRef, watchEffect, reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import reflectorMesh from 'PLS/floor/components/reflectorMesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import planeClipping from '../components/planeClipping.vue'

const configState = reactive({
	mirrorSize: 900,
	gridSize: 880,
	mirrorColor: '#efefef',
	divisions: 10,								//网格密度							 初始化时设置
	colorCenterLine: "#444444",		//网格颜色 中心的XZ轴		  初始化时设置
	colorGrid: "#888888"					//网格颜色							 初始化时设置
})

const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(1000, 1000)
		TDirectionalLight.value.shadow.camera.near = 0.1
		TDirectionalLight.value.shadow.camera.far = 5000
		TDirectionalLight.value.shadow.camera.top = 200
		TDirectionalLight.value.shadow.camera.right = 200
		TDirectionalLight.value.shadow.camera.left = -200
		TDirectionalLight.value.shadow.camera.bottom = -200
		TDirectionalLight.value.shadow.radius = 10
	}
})

</script>

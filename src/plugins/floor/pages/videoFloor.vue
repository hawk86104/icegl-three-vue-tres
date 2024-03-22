<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-18 18:17:57
-->
<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 20, 0]" :fov="45" :near="0.1" :far="10000" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="6.0" />
		<videoFloorCom v-bind="configState" :position="[0, 0, 10]" :size="[10, 10]"
			vSrcPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV1.mp4" />
		<videoFloorCom color="#02a7ff" :position="[0, -1, 10]" :size="[13, 13]"
			vSrcPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV2.mp4" />

		<videoFloorCom color="#7300a8" :opacity="0.6" :position="[0, 0, -10]" :size="[10, 10]"
			vSrcPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV3.mp4" />
		<videoFloorCom color="#f605ff" :rotationZ="-0.01" :position="[0, -1, -10]" :size="[13, 13]"
			vSrcPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV3.mp4" />

		<videoFloorCom color="#02a7ff" :rotationZ="0" :position="[0, -1.99, 0]" :opacity="0.06" :textureRepeat="[3, 2]"
			:size="[40, 40]" vSrcPath="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/grid.mp4" />

		<Suspense>
			<reflectorDUDV :position="[0, -2, 0]" v-bind="reflectorState" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import videoFloorCom from '../components/videoFloor.vue'
import reflectorDUDV from '../components/reflectorDUDV.vue'

const reflectorState = reactive({
	reflectivity: 2.6,
	showGridHelper: false,
	scale: 4
})
const configState = reactive({
	color: "#fff",
	opacity: 0.95,
	rotationZ: 0.01
})

const paneControl = new Pane({
	title: 'video地面',
	expanded: true,
})
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', {
	label: '透明度', min: 0.0,
	max: 1.0,
	step: 0.01,
})
paneControl.addBinding(configState, 'rotationZ', {
	label: '自转速度', min: -0.1,
	max: 0.1,
	step: 0.01,
})
</script>
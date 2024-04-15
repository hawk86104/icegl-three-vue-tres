<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 21:00:53
-->
<template>
	<loading />
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[0, 2, 5]" :fov="45" :near="0.1" :far="500" />
		<OrbitControls v-bind="controlsState" />
		<!-- <TresAmbientLight color="#ffffff" intensity="10" />
		<TresDirectionalLight :position="[0, 2, -4]" :intensity="1" /> -->

		<Suspense>
			<car :run="showSpeedup" />
		</Suspense>

		<Suspense>
			<speedup :visible="showSpeedup" />
		</Suspense>

		<Suspense>
			<startroom :hide="showSpeedup" />
		</Suspense>

		<Suspense>
			<Environment :blur="0" :far="1000" :useDefaultScene="showSpeedup">
				<Lightformer :intensity="0.66" :rotation-x="Math.PI / 2" :position="[0, 5, 0]" :scale="[10, 10, 1]" />
			</Environment>
		</Suspense>

		<su7Effect :hide="showSpeedup" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { randomLoading as loading } from 'PLS/UIdemo'
import { Pane } from 'tweakpane'
import { Environment, Lightformer } from 'PLS/basic'
import startroom from '../components/su7/startroom.vue'
import car from '../components/su7/car.vue'
import speedup from '../components/su7/speedup.vue'
import su7Effect from '../components/su7/effect.vue'

const state = reactive({
	clearColor: '#000',
	antialias: false,
	// logarithmicDepthBuffer: true, // 开启后，镜面反射底部会透明过来
	disableRender: true
})
const controlsState = reactive({
	autoRotate: true,
})

const showSpeedup = ref(false)
const paneControl = new Pane({ title: '参数', })
const btn = paneControl.addButton({
	title: '启动',
	label: '流光模式',
})

// let count = 0
btn.on('click', () => {
	showSpeedup.value = !showSpeedup.value
	btn.title = showSpeedup.value ? '停止' : '启动'
})
</script>
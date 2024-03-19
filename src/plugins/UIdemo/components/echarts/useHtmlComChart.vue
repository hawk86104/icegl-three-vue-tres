<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 08:37:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-19 15:00:48
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Html } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import * as echarts from 'echarts'

const { scene } = useTresContext()
const state = reactive({
	wrapperClass: 'chartDiv',
	as: 'div',
	// center: true,
	transform: true,
	distanceFactor: 10,
	// prepend: true,
	// sprite: true,
	// occlude: [],//Can be true, Ref<TresObject3D>[], 'raycast', or 'blending'. True occludes the entire scene.
})

let chart = null
const intChart = () => {
	chart = echarts.init(document.getElementById('main'))
	chart.setOption({
		tooltip: {},
		xAxis: {
			data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
		},
		yAxis: {},
		series: [
			{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20, 10],
			},
		],
	})
}

const htmlRef = ref(null as any)
const { onLoop } = useRenderLoop()
onLoop(() => {
	if (htmlRef.value && !chart) {
		intChart()
	}
})
</script>

<template>
	<Html ref="htmlRef" v-bind="state" :position="[0, 0, -1]">
	<div id="main" style="width: 300px; height: 300px"></div>

	</Html>
</template>

<style lang="less">
.chartDiv {
	#inner {
		user-select: none;
		pointer-events: none !important;
	}
}
</style>
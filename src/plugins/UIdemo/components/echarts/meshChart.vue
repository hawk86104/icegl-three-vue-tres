<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 16:05:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-19 18:15:58
-->
<script lang="ts" setup>
import * as echarts from "echarts"
import * as THREE from "three"
import { createVNode, render } from 'vue'

const width = 1024
const height = 768
const scale = [0.006, 0.006]
const chartNode = createVNode('canvas', { width, height, style: {} })
render(chartNode, document.createElement('div'))
const pieChart = echarts.init(chartNode.el as HTMLCanvasElement, 'dark')
const option = {
	backgroundColor: 'transparent',
	legend: {
		top: 'bottom',
		padding: [0, 0, 30, 0]
	},
	series: [
		{
			name: 'Nightingale Chart',
			type: 'pie',
			radius: [50, 250],
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			data: [
				{ value: 40, name: 'rose 1' },
				{ value: 38, name: 'rose 2' },
				{ value: 32, name: 'rose 3' },
				{ value: 30, name: 'rose 4' },
				{ value: 28, name: 'rose 5' },
				{ value: 26, name: 'rose 6' },
				{ value: 22, name: 'rose 7' },
				{ value: 18, name: 'rose 8' }
			]
		}
	]
}
pieChart.setOption(option)
const chartTexture = new THREE.CanvasTexture(chartNode.el)
pieChart.on('finished', () => {
	chartTexture.needsUpdate = true
})
</script>

<template>
	<TresMesh :scale="[width * scale[0], height * scale[1], 1]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshBasicMaterial transparent :side="THREE.DoubleSide" :map="chartTexture" :depthWrite="false" />
	</TresMesh>
</template>

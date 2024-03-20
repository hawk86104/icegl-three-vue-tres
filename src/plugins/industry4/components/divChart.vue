<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 16:05:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 10:17:29
-->
<script lang="ts" setup>
import * as echarts from "echarts"
import * as THREE from "three"
import { createVNode, render } from 'vue'
import { useRenderLoop } from '@tresjs/core'

const width = 1024
const height = 768
const scale = [0.0015, 0.0015]
const chartNode = createVNode('canvas', { width, height, style: {} })
render(chartNode, document.createElement('div'))
const pieChart = echarts.init(chartNode.el as HTMLCanvasElement, 'dark')
const option = {
	title: {
		text: '最大输出功率',
		textStyle: {
			fontSize: 78
		},
		padding: [60, 50],
	},
	backgroundColor: '#111111f3',
	grid: {
		left: '50',
		right: '50',
		bottom: '50',
		top: '190',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ['01', '03', '06', '09', '12', '15', '18'],
		axisLabel: {
			fontSize: 38
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			fontSize: 28
		},
	},
	series: [
		{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			smooth: true,
			lineStyle: {
				color: '#ffffffff'
			},
			animationDuration: function (idx) {
				return idx * 100 + 3000;
			}
		}
	],
	animationEasing: 'elasticOut',
}
let isFinished = false
const chartTexture = new THREE.CanvasTexture(chartNode.el)


const resetChart = () => {
	isFinished = false
	pieChart.off('finished')

	//可循环动画
	pieChart.clear()
	pieChart.on('finished', () => {
		isFinished = true
	})
	pieChart.setOption(option)
}
resetChart()

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (!isFinished) {
		chartTexture.needsUpdate = true
	} else {
		resetChart()
	}
})
</script>

<template>
	<TresMesh :scale="[width * scale[0], height * scale[1], 1]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshBasicMaterial transparent :side="THREE.DoubleSide" :map="chartTexture" :depthWrite="false" />
	</TresMesh>
</template>

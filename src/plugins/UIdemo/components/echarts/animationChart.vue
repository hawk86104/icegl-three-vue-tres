<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 16:05:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-19 19:28:05
-->
<script lang="ts" setup>
import * as echarts from "echarts"
import * as THREE from "three"
import { createVNode, render } from 'vue'
import { useRenderLoop } from '@tresjs/core'

var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
	xAxisData.push('A' + i);
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

const width = 1024
const height = 768
const scale = [0.006, 0.006]
const chartNode = createVNode('canvas', { width, height, style: {} })
render(chartNode, document.createElement('div'))
const pieChart = echarts.init(chartNode.el as HTMLCanvasElement, 'dark')
const option = {
	title: {
		text: 'Bar Animation Delay',
		padding: 20
	},
	legend: {
		data: ['bar', 'bar2'],
		padding: 20
	},
	xAxis: {
		data: xAxisData,
		splitLine: {
			show: false
		}
	},
	yAxis: {},
	series: [
		{
			name: 'bar',
			type: 'bar',
			data: data1,
			emphasis: {
				focus: 'series'
			},
			animationDelay: function (idx) {
				return idx * 10;
			}
		},
		{
			name: 'bar2',
			type: 'bar',
			data: data2,
			emphasis: {
				focus: 'series'
			},
			animationDelay: function (idx) {
				return idx * 10 + 100;
			}
		}
	],
	animationEasing: 'elasticOut',
}
const chartTexture = new THREE.CanvasTexture(chartNode.el)
let isFinished = false

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

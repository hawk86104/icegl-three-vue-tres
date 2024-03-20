<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 16:05:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 08:34:26
-->
<script lang="ts" setup>
import * as echarts from "echarts"
import * as THREE from "three"
import { createVNode, render } from 'vue'
import { useRenderLoop } from '@tresjs/core'

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
	tooltip: {
		trigger: 'item'
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
let isFinished = false
const chartTexture = new THREE.CanvasTexture(chartNode.el)
pieChart.on('finished', () => {
	isFinished = true
	chartTexture.needsUpdate = true
})

const { onLoop } = useRenderLoop()
const dataLength = option.series[0].data.length
let currentIndex = 0
let deltaCount = 0
onLoop(() => {
	if (isFinished && deltaCount++ % 60 === 0) {
		pieChart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0,
			dataIndex: currentIndex
		})
		currentIndex = (currentIndex + 1) % dataLength
		pieChart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: currentIndex,
		})
		pieChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: currentIndex
		})
		chartTexture.needsUpdate = true
	}
})
</script>

<template>
	<TresMesh :scale="[width * scale[0], height * scale[1], 1]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshBasicMaterial transparent :side="THREE.DoubleSide" :map="chartTexture" :depthWrite="false" />
	</TresMesh>
</template>

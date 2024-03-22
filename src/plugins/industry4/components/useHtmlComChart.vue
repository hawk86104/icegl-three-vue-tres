<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-19 08:37:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 08:11:18
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Html } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import * as echarts from 'echarts'

const state = reactive({
	wrapperClass: 'chartDiv',
	as: 'div',
	transform: true,
	distanceFactor: 2,
	zIndexRange: [900000, 0],
})

let chart = null as any
const option = {
	title: {
		text: '最大输出功率',
		textStyle: {
			fontSize: 18
		},
		padding: [20, 20],
	},
	backgroundColor: '#b8e4ff3b',
	grid: {
		left: '10',
		right: '20',
		bottom: '10',
		top: '70',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ['01', '03', '06', '09', '12', '15', '18'],
		axisLabel: {
			fontSize: 18
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			fontSize: 18
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
const intChart = () => {
	chart = echarts.init(document.getElementById('main'), 'dark')
	chart.setOption(option)
	chart.on('finished', () => {
		isFinished = true
	})
}

const htmlRef = ref(null as any)

let isFinished = false
const resetChart = () => {
	isFinished = false
	chart.off('finished')

	//可循环动画
	chart.clear()
	chart.on('finished', () => {
		isFinished = true
	})
	chart.setOption(option)
}

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (htmlRef.value && !chart) {
		intChart()
	}
	if (chart && isFinished) {
		resetChart()
	}
})
</script>

<template>
	<Html ref="htmlRef" v-bind="state" :position="[0, 0, -1]">
	<div id="main" style="width: 500px; height: 300px"></div>

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
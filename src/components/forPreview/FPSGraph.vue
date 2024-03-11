<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-27 08:47:58
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-29 08:06:31
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { useFps, useRafFn } from '@vueuse/core'

const width = 58
const height = 30
const strokeWidth = 2
const updateInterval = 100 // Update interval in milliseconds
const topOffset = 0 // Offset from the top
const fps = useFps({ every: updateInterval })

const points = ref('')
const frameTimes = ref([])
const maxFrames = ref(width / strokeWidth)

let lastUpdateTime = performance.now()

useRafFn(({ timestamp }) => {
	if (timestamp - lastUpdateTime >= updateInterval) {
		lastUpdateTime = timestamp

		frameTimes.value.push(fps.value as never)

		if (frameTimes.value.length > maxFrames.value) {
			frameTimes.value.shift()
		}

		points.value = frameTimes.value
			.map(
				(fps, index) =>
					`${index * strokeWidth},${height + topOffset - strokeWidth / 2 - (fps * (height + topOffset - strokeWidth)) / 160
					}`,
			)
			.join(' ')
	}
})
</script>

<template>
	<div class="fpsStats">
		<div class="number">
			{{ Math.round(fps) }} <br /> FPS
		</div>
		<svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
			<polyline :points="points" fill="none" stroke="#5384ff" :stroke-width="strokeWidth" stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
	</div>
</template>
<style lang="less" scoped>
.fpsStats {
	z-index: 99999;
	position: fixed;
	display: flex;
	align-items: center;
	background-color: white;
	padding: 3px;
	border: 1px solid #5384ff;
	top: 1px;
	left: 1px;

	.number {
		font-size: 9px;
		margin-right: 6px;
		color: #5384ff;
		text-align: center;
	}

	svg {
		background-color: rgb(243 244 246);
	}
}
</style>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 10:30:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-06 15:08:26
-->
<template>
	<Html v-bind="state" :position="[0.6, -0.01, 0.16]" :rotation="[0, 0.6, 0]">
	<svg xmlns="http://www.w3.org/2000/svg" @click="onClick">
		<circle id="arc1" class="circle" cx="150" cy="150" r="120" opacity=".89" fill="none" stroke="#632b26"
			stroke-width="12" stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc2" class="circle" cx="150" cy="150" r="120" opacity=".49" fill="none" stroke="#632b26" stroke-width="8"
			stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc3" class="circle" cx="150" cy="150" r="100" opacity=".49" fill="none" stroke="#632b26"
			stroke-width="20" stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc4" class="circle" cx="150" cy="150" r="120" opacity=".49" fill="none" stroke="#632b26"
			stroke-width="30" stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc5" class="circle" cx="150" cy="150" r="100" opacity=".89" fill="none" stroke="#632b26" stroke-width="8"
			stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc6" class="circle" cx="150" cy="150" r="90" opacity=".49" fill="none" stroke="#632b26" stroke-width="16"
			stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc7" class="circle" cx="150" cy="150" r="90" opacity=".89" fill="none" stroke="#632b26" stroke-width="8"
			stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
></circle>
		<circle id="arc8" class="circle" cx="150" cy="150" r="80" opacity=".79" fill="#4DD0E1" fill-opacity="0"
			stroke="#632b26" stroke-width="8" stroke-linecap="square" stroke-opacity=".99213" paint-order="fill markers stroke"
>
		</circle>
	</svg>
</Html>
</template>
<script setup lang="ts">
import { Html } from "@tresjs/cientos"
// import { useSeek } from "@tresjs/core"
import { reactive, inject } from 'vue'

const props = defineProps({
	model: {
		type: Object,
		required: true,
	},
})

const animationPlay = inject('animationPlay')
const onClick = () => {
	animationPlay.value = !animationPlay.value
}

// const { seek } = useSeek()
// const seekObj = seek(props.model, 'name', 'Object_6')
// seekObj.material.color.set('red')
const state = reactive({
	wrapperClass: 'svgCom',
	as: 'div',
	transform: true,
	distanceFactor: 0.3,
	center: true,
	// occlude: [seekObj]
})
</script>
<style>
.svgCom>div:first-of-type {
	position: relative !important;
}

.svgCom {
	user-select: none;
	pointer-events: none !important;

	#outer {
		user-select: none;
		pointer-events: none !important;

		#inner {
			cursor: pointer;
			user-select: none;
		}
	}
}
</style>
<style scoped>
svg {
	width: 300px;
	height: 300px;
}

svg circle {
	stroke: #ffffff;
}

.circle {
	transform-origin: center;
}

#arc1 {
	stroke-dasharray: 30;
	stroke-dashoffset: 18;
	animation: 10s -2s rota infinite linear;
}

#arc3 {
	stroke-dasharray: 400;
	stroke-dashoffset: 400;
	animation: 16s 1s rota infinite linear;
}

#arc4 {
	stroke-dasharray: 400;
	stroke-dashoffset: 400;
	animation: 6s 1s rota infinite linear reverse;
}

#arc5 {
	stroke-dasharray: 400;
	stroke-dashoffset: 400;
	animation: 4s 1s rota infinite linear;
}

#arc6 {
	stroke-dasharray: 400;
	stroke-dashoffset: 400;
	animation: 8s 1s rota infinite linear alternate;
}

#arc7 {
	stroke-dasharray: 400;
	stroke-dashoffset: 400;
	animation: 4s 1s rota infinite linear reverse;
}

text {
	fill: #ffffff;
	font: bold 24px sans-serif;
}

@keyframes rota {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>

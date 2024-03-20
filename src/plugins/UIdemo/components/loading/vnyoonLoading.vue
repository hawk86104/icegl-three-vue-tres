<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 17:14:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 17:22:47
-->
<template>
	<div v-show="!hasFinishLoading"
		class="absolute bg-grey-600 t-0 l-0 w-full h-full z-999999 flex justify-center items-center text-black font-mono bg-black">
		<div class=" text-white">
			<div class="loader">
				<span></span>
				<span></span>
				<span></span>

				<span></span>
				<span></span>
				<span></span>

				<span></span>
				<span></span>
				<span></span>
			</div>
			<span class="pspan" v-if="showProgress">{{ progress }} %</span>
		</div>
	</div>
</template>


<script setup lang="ts">
import { useProgress } from '@tresjs/cientos'

const props = withDefaults(defineProps<{
	isDemo?: boolean
	showProgress?: boolean
}>(), {
	isDemo: false,
	showProgress: true
})
const { hasFinishLoading, progress } = await useProgress()

const animloop = () => {
	if (progress.value++ > 100) {
		progress.value = 0
	}
	requestAnimationFrame(animloop)
}
if (props.isDemo) {
	requestAnimationFrame(animloop)
}
</script>

<style lang="less" scoped>
.pspan {
	position: absolute;
	top: calc(50% - 0.75em);
	left: calc(50% - 1.75em);
	font-size: 20px;
	background: #00000080;
	padding: 0.2em 0em;
	width: 3.5em;
	text-align: center;
	border-radius: 2em;
}

.loader {
	display: grid;
	grid-template-columns: repeat(3, 50px);
	grid-template-rows: repeat(3, 50px);
	gap: 5px;

	transform: rotate(45deg);
}

.loader span {
	display: block;
	background-color: #fff;
	border-radius: 8px;

	animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {

	0%,
	100% {
		opacity: 0;
		transform: scale(0);
	}

	35%,
	65% {
		opacity: 1;
		transform: scale(1);
	}
}

/* 1~3 */
.loader span:nth-child(-n+3) {
	background-color: #4bc8eb;
}

/* 4~6 */
.loader span:nth-child(n+4):nth-child(-n+6) {
	background-color: #f13a8f;
}

/* 7~9 */
.loader span:nth-child(n+7):nth-child(-n+9) {
	background-color: #36f372;
}

/* 第一列 */
.loader span:nth-child(7) {
	animation-delay: 0.6s;
}

/* 第二列 */
.loader span:nth-child(4),
.loader span:nth-child(8) {
	animation-delay: 0.7s;
}

/* 第三列 */
.loader span:nth-child(1),
.loader span:nth-child(5),
.loader span:nth-child(9) {
	animation-delay: 0.8s;
}

/* 第四列 */
.loader span:nth-child(2),
.loader span:nth-child(6) {
	animation-delay: 0.9s;
}

/* 第五列 */
.loader span:nth-child(3) {
	animation-delay: 1s;
}
</style>
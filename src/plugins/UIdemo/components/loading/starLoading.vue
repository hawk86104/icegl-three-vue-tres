<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 18:46:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 10:14:37
-->
<template>
	<div v-if="!hasFinishLoading"
		class="absolute bg-grey-600 t-0 l-0 w-full h-full z-999999 flex justify-center items-center text-black font-mono bg-black">
		<div class=" text-white">
			<div class="stars flex-wrap">
				<span v-for="index in 12" :key="index" :style="`--i: ${index + 1}`">
					<i></i>
				</span>
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
.flex-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
}

.stars {
	position: relative;

	width: 300px;
	height: 300px;
	animation: animateColor 7.2s linear infinite;
}

@keyframes animateColor {
	0% {
		filter: hue-rotate(0);
	}

	100% {
		filter: hue-rotate(360deg)
	}
}

.stars span {
	position: absolute;
	transform-origin: 150px;
	transform: translateX(-150px) rotate(calc(var(--i) * 30deg));
	filter: drop-shadow(0 0 5px #3cc2ff) drop-shadow(0 0 15px #3cc2ff) drop-shadow(0 0 30px #3cc2ff);
}

.stars span i {
	position: relative;
	display: block;
	color: #3cc2ff;
	animation: rotateStar 2.4s linear infinite;
	animation-delay: calc(var(--i) * -0.2s);
}

@keyframes rotateStar {
	0% {
		transform: rotate(0) scale(0);
	}

	50% {
		transform: rotate(180deg) scale(3);
	}

	100% {
		transform: rotate(360deg) scale(0);
	}
}

.stars span i:before {
	content: "☺";
	// font-size: 0.66em;
}

.stars span::before {
	content: "☺";
	font-size: 0.75em;
	color: #131a1c;
	position: absolute;
	animation: rotateParticle 2.4s linear infinite;
	animation-delay: calc(var(--i) * -0.2s);
}

@keyframes rotateParticle {
	0% {
		scale: 1;
		opacity: 0;
		rotate: 0;
	}

	50% {
		scale: 1;
		opacity: 1;
		rotate: 180deg;
	}

	100% {
		scale: 0;
		opacity: 0;
		rotate: 360deg;
		filter: drop-shadow(-150px 0 #3cc2ff) drop-shadow(150px 0 #3cc2ff) drop-shadow(0 -150px #3cc2ff) drop-shadow(0 150px #3cc2ff);
	}
}

.pspan {
	position: absolute;
	top: 50%;
	left: calc(50% - 1em);
	font-size: 20px;
}
</style>
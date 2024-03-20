<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 17:14:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-14 08:13:11
-->
<template>
	<div v-if="!hasFinishLoading"
		class="absolute bg-grey-600 t-0 l-0 w-full h-full z-999999 flex justify-center items-center text-black font-mono bg-black">
		<div class=" text-white">
			<div class="loader">
				<svg viewBox="0 0 800 600" xml:space="preserve">
					<symbol id="single">
						<path d="M357.5,211.693c0,35.741,16.598,67.6,42.5,88.307
		c25.902-20.707,42.5-52.566,42.5-88.307s-16.598-67.6-42.5-88.307C374.098,144.094,357.5,175.953,357.5,211.693z" />
					</symbol>
					<g id="leaf">
						<use class="flo" v-for="index in 36" :key="index" xlink:href="#single" />
					</g>
				</svg>
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

<style lang="scss" scoped>
@import "./yangyangLoading.scss";

.loader {
	width: 400px;
}

.pspan {
	text-align: center;
	width: 100%;
	display: block;
	margin-top: -50px;
}
</style>
<!--
 * @Description: https://juejin.cn/post/7221320687430942781
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 15:00:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-14 08:12:03
-->
<template>
	<div v-if="!hasFinishLoading"
		class="absolute bg-grey-600 t-0 l-0 w-full h-full z-999999 flex justify-center items-center text-black font-mono bg-black">
		<div class=" text-white">
			<div class="g-container">
				<div class="g-circle"></div>
				<ul class="g-bubbles">
					<li v-for="index in 200" :key="index" class="g-bubble" />
				</ul>
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
@import "./bubbleLoading.scss";

.pspan {
	position: absolute;
	top: 50%;
	left: calc(50% - 1em);
	font-size: 20px;
}
</style>
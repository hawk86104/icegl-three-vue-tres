<!--
 * @Description: https://css-loaders.com/
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-12 21:53:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-14 08:12:45
-->
<template>
	<div v-if="!hasFinishLoading"
		class="absolute bg-grey-600 t-0 l-0 w-full h-full z-999999 flex justify-center items-center text-black font-mono bg-black">
		<div class="text-center text-white">
			<div class="loader1" v-if="props.styleNum === 0"></div>
			<div class="loader2" v-else-if="props.styleNum === 1"></div>
			<div class="loader3" v-else-if="props.styleNum === 2"></div>
			<div class="loader4" v-else-if="props.styleNum === 3"></div>
			<div class="loader5" v-else-if="props.styleNum === 4"></div>
			<div class="loader6" v-else-if="props.styleNum === 5"></div>
			<div class="loader7" v-else-if="props.styleNum === 6"></div>

			<template v-if="showProgress">{{ progress }} %</template>
		</div>
	</div>
</template>


<script setup lang="ts">
import { useProgress } from '@tresjs/cientos'

const props = withDefaults(defineProps<{
	styleNum?: number
	isDemo?: boolean
	showProgress?: boolean
}>(), {
	styleNum: 0,
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
@import "./cssLoaders.less";
</style>
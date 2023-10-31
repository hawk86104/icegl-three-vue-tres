<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-31 15:37:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-31 17:42:52
-->
<template>
	<Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-0"
		leave-active-class="opacity-0 transition-opacity duration-2000">
		<div v-show="!hasFinishLoading" class="w-full h-screen flex justify-center items-center z-999" ref="vantaRef">
			<div class="text-white text-10 w-full text-center p-10 select-none" style="background-color: #0000007a;">
				载入中 · · · {{ progress }} %
				<LoadingOutlined class="text-rose" />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { LoadingOutlined } from '@fesjs/fes-design/icon';
import * as THREE from 'three'
import GLOBE from 'vanta/dist/vanta.globe.min'

const props = withDefaults(
	defineProps<{
		hasFinishLoading?: boolean
		progress?: number
	}>(),
	{
		hasFinishLoading: false,
		progress: 0,
	},
)
const vantaRef = ref()
let vantaEffect = null as any
const initVantaEffect = () => {
	if (vantaEffect === null) {
		vantaEffect = GLOBE({
			el: vantaRef.value,
			THREE
		})
	}
}
const destroyVantaEffect = () => {
	if (vantaEffect) {
		setTimeout(() => {
			vantaEffect.destroy()
			vantaEffect = null
		}, 2000)
	}
}
onMounted(() => {
	initVantaEffect()
})
onUnmounted(() => {
	destroyVantaEffect()
})
watch(
	() => props.hasFinishLoading,
	async (nv, ov) => {
		console.log(nv, ov)
		if (nv || !ov) {
			destroyVantaEffect()
		} else {
			initVantaEffect()
		}
	})
watch(
	() => props.progress,
	async (nv, ov) => {
		console.log('progress:', nv, ov)

	})
</script>
<style lang="less"></style>
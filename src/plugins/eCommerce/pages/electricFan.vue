<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 08:58:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-16 09:58:23
-->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from "@tresjs/core"
import { reactive } from "vue"
import { BasicShadowMap, SRGBColorSpace } from 'three'
import eFan from '../components/eFan.vue'

const gl = {
	shadows: true,
	alpha: true,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
}

const state = reactive({
	selectedColor: '#903345',
	colors: ['#903345', '#F2D3AC', '#F2F2F2', '#000000'],
})
</script>

<template>
	<div class="landingpage-bg w-full inset-0 h-full" />
	<div class="absolute
    p-8
    md:p-0
    w-full
    inset-0
    h-full
    flex
    flex-col
    md:flex-row
    md:justify-center
    md:items-center
    bg-red-200
    bg-opacity-75">
		<div class="w-full h-full md:w-2/3 md:h-1/2 bg-red-300 shadow-lg rounded flex flex-col md:flex-row">
			<div class="h-1/2 w-full md:w-1/2" />
			<div class="p-6 w-full md:w-1/2 md:p-4 text-light">
				<h1 class="title animate-fade-in-right animate-ease">
					电风扇 🌀
				</h1>

				<span class="absolute border-1 border-solid border-white w-800px inline-block" />

				<p class="w-full md:w-2/3 my-8 animate-fade-in mt-32 position-relative">
					点击 "下方按钮" ，选择自己喜欢的颜色。<br>
					点击 "模型上按钮" ，开关风扇。
				</p>

				<ul class="flex gap-8">
					<li v-for="color in state.colors" :key="color">
						<button class="w-10 h-10 rounded-full border-2 border-solid border-white mr-2 cursor-pointer"
							:style="{ backgroundColor: color }" @click="state.selectedColor = color" />
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="absolute w-full md:w-1/2 inset-0 h-2/3 md:h-full flex justify-center items-center">
		<TresCanvas v-bind="gl" class="pointer-events-none">
			<TresPerspectiveCamera :position="[10, 5, -8]" :fov="45" :near="0.1" :far="100000" :look-at="[0, 0, 0]" />
			<OrbitControls enableDamping />

			<Suspense>
				<eFan :color="state.selectedColor" />
			</Suspense>

			<TresAmbientLight :intensity="2" />
			<TresPointLight :position="[0, 0, 10]" :intensity="1" />
			<TresDirectionalLight :position="[3, 3, 3]" :intensity="3" />
		</TresCanvas>
	</div>
</template>

<style>
#app {
	width: 100%;
	height: 100vh;
}
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Heebo&display=swap');

* {
	font-family: 'Heebo', sans-serif;
}

.title {
	margin-top: -120px;
	font-family: 'Bebas Neue', cursive;
	font-size: 128px;

	@media (max-width: 768px) {
		margin-top: 20px;
		font-size: 64px;
	}
}

.landingpage-bg {
	background-image: url("@/../plugins/digitalCity/preview/heatmap2.png");
	filter: blur(46px);
}

li {
	list-style: none;
}
</style>

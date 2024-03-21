<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:08:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 08:10:47
-->

<script setup lang="ts">
import { ref, reactive } from 'vue'

import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, Html } from '@tresjs/cientos'

const gl = {
	clearColor: '#82DBC5',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
}

const sphereRef = ref(null)
const torusRef = ref(null)

const state = reactive({
	wrapperClass: 'wrapper',
	as: 'div',
	center: true,
})

</script>

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[3, 0, 8]" />
		<OrbitControls />
		<TresMesh :position="[1, 1, 1]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
			<Html v-bind="state" transform :occlude="[sphereRef]">
			<h1 class="bg-white text-xs p-0.5 rounded">
				I'm a Box 📦
			</h1>

			</Html>
		</TresMesh>
		<TresMesh ref="sphereRef" :position="[4, 1, 1]">
			<TresSphereGeometry />
			<TresMeshNormalMaterial />
			<Html v-bind="state" transform>
			<h1 class="bg-white text-xs p-0.5 rounded">
				I'm a Sphere ⭕️
			</h1>

			</Html>
		</TresMesh>
		<TresMesh ref="torusRef" :position="[7, 1, 1]">
			<TresTorusGeometry />
			<TresMeshNormalMaterial />
			<Html v-bind="state" transform sprite>
			<h1 class="bg-white text-xs p-0.5 text-fuchsia-500">
				I'm a Sprite 👻
			</h1>

			</Html>
		</TresMesh>

		<Html :position="[2, -1, 1]" v-bind="state" transform sprite>
		<h1 class="bg-blue-gray-900 text-xs rounded p-0.5 text-green-100">
			I'm just a Div 🔖
		</h1>

		</Html>

		<TresAmbientLight :intensity="1" />
	</TresCanvas>
</template>

<!-- scoped -->
<style lang="less">
.wrapper {
	#inner {
		user-select: none;
		pointer-events: none !important;
	}
}
</style>

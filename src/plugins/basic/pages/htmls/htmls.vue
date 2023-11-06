<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:08:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 11:09:45
-->

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
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
		</TresMesh>
		<TresAmbientLight :intensity="1" />
	</TresCanvas>
</template>

<style scoped>
.web {
	width: 600px;
	height: 400px;
	border-radius: 10px;
}
</style>

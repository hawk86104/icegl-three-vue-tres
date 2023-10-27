<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-27 18:37:29
-->
<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { useTexture } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'

const options = reactive({
	speed: 12,
	randomness: 0,
	count: 6000,
	size: 7,
	areaX: 1500,
	areaY: 1000,
	areaZ: 1500,
})
const texture = await useTexture({ map: './plugins/digitalCity/image/rain.png' })
const precipitationRef = ref()
watchEffect(() => {
	if (precipitationRef.value) {
		debugger
		precipitationRef.value.$refs.geometryRef
	}
})
</script>

<template>
	<Precipitation ref="precipitationRef" :speed="options.speed" :area="[options.areaX, options.areaY, options.areaZ]"
		:count="options.count" :depthWrite="false" :randomness="options.randomness" :size="options.size" :opacity="1.0"
		:map="texture.map" :alphaMap="texture.map" />
</template>

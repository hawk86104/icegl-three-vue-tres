<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:48:40
-->
<script setup lang="ts">
import { reactive, ref, watchEffect, watch } from 'vue'
import { useTexture } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
import { Texture } from 'three';

const props = withDefaults(
	defineProps<{
		speed?: number
		randomness?: number
		count?: number
		size?: number
		areaX?: number
		areaY?: number
		areaZ?: number
		type?: string
		color?: string
	}>(),
	{
		speed: 12,
		randomness: 0,
		count: 6000,
		size: 7,
		areaX: 1500,
		areaY: 1000,
		areaZ: 1500,
		color: '#fff',
		type: 'snow',	// snow rain point
	},
)

const imgList = {
	snow: './plugins/digitalCity/image/snow.png',
	rain: './plugins/digitalCity/image/rain.png',
	cilcle: './plugins/digitalCity/image/cilcle.png',
}
const texture = reactive({})
if (imgList[props.type]) {
	texture.value = await useTexture({ map: imgList[props.type] })
}
const precipitationRef = ref()
watchEffect(async () => {
	// if (precipitationRef.value) {
	// 	precipitationRef.value.$refs.geometryRef
	// }
	// if (props.type) {
	// 	console.log(props, texture)
	// 	if (texture.value) {
	// 		texture.value.map.dispose()
	// 		texture.value = await useTexture({ map: imgList[props.type] })
	// 	}
	// }
})
watch(
	() => props.type,
	async (nv, ov) => {
		if (nv != ov) {
			if (texture.value?.map) {
				texture.value.map.dispose()
			}
			texture.value = await useTexture({ map: imgList[nv] ? imgList[nv] : imgList.cilcle })
		}
	})
</script>

<template>
	<Precipitation ref="precipitationRef" :position="[0, props.areaY / 2, 0]" :speed="props.speed" :color="props.color"
		:alphaTest="0.5" :area="[props.areaX, props.areaY, props.areaZ]" :count="props.count" :depthWrite="true"
		:randomness="props.randomness" :size="props.size" :opacity="1.0" :map="texture.value.map"
		:alphaMap="texture.value.map" />
</template>

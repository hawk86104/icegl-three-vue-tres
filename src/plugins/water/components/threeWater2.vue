<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 15:00:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-21 09:03:31
-->

<template>
	<primitive :object="tsWater" :rotation-x="-Math.PI / 2" />
</template>

<script setup lang="ts">
import { Vector2, PlaneGeometry, BufferGeometry, DoubleSide } from 'three'
import { useTexture } from '@tresjs/core'
import { Water } from 'three/addons/objects/Water2'
import { watchEffect } from 'vue'

const props = withDefaults(defineProps<{
	waterGeometry?: BufferGeometry,
	color?: String
	scale?: Number
}>(), {
	waterGeometry: new PlaneGeometry(20, 20),
	color: '#FFF',
	scale: 1.0
})

const pTexture = await useTexture(['./plugins/water/images/Water_1_M_Normal.jpg', './plugins/water/images/Water_2_M_Normal.jpg'])

const wG = props.waterGeometry.clone()
const tsWater = new Water(
	wG,
	{
		color: props.color,
		scale: props.scale,
		flowDirection: new Vector2(1, 1),
		textureWidth: 1024,
		textureHeight: 1024,
		normalMap0: pTexture[0],
		normalMap1: pTexture[1]
	}
)
tsWater.material.transparent = true
tsWater.material.depthWrite = true
tsWater.material.depthTest = true
tsWater.material.side = DoubleSide
watchEffect(() => {
	if (props.color) {
		tsWater.material.uniforms.color.value.set(props.color)
	}
	if (props.scale) {
		tsWater.material.uniforms.config.value.w = props.scale
	}
})

</script>

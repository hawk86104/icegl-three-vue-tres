<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-18 18:19:05
-->
<script setup lang="ts">
import { Color, EdgesGeometry, ShaderMaterial, LineSegments } from 'three'
import { useRenderLoop } from '@tresjs/core'
import vertexShader from '../../../shaders/buildingsEfffectA.vert?raw'
import fragmentShader from '../../../shaders/buildingsEfffectA.frag?raw'

import { watchEffect } from 'vue'
const props = withDefaults(
	defineProps<{
		builds: any
		color?: string
		srcColor?: string
		scale?: number
		gradual?: number
		speed?: number
	}>(),
	{
		color: '#FFF',
		srcColor: '#000',
		scale: 2000,
		gradual: 10,
		speed: 0.5
	},
)
let line = null as any
const shader = {
	transparent: true,
	uniforms: {
		uColor: {
			value: new Color(props.color)
		},
		uSrcColor: {
			value: new Color(props.srcColor)
		},
		uScale: {
			value: props.scale
		},
		uTime: {
			value: 0
		},
		uGradual: {
			value: props.gradual
		},
	},
	vertexShader,
	fragmentShader
}
let geometry = new EdgesGeometry(props.builds.geometry).clone()
geometry = geometry.applyMatrix4(props.builds.matrix)
const surroundLineMaterial = new ShaderMaterial(shader)
line = new LineSegments(geometry, surroundLineMaterial)
line.material.linewidth = props.width
line.renderOrder = 1000

watchEffect(() => {
	if (props.color) {
		shader.uniforms.uColor.value = new Color(props.color)
	}
	if (props.srcColor) {
		shader.uniforms.uSrcColor.value = new Color(props.srcColor)
	}
	if (props.scale) {
		shader.uniforms.uScale.value = props.scale
	}
	if (props.gradual) {
		shader.uniforms.uGradual.value = props.gradual
	}
});
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	shader.uniforms.uTime.value += delta * props.speed
	shader.uniforms.uTime.value %= 1
})
</script>

<template>
	<primitive :object="line" />
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-23 15:48:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-28 16:43:37
-->
<script setup lang="ts">
import { useRenderLoop, useTexture } from '@tresjs/core'
import fireAVue from '../../pages/fireA.vue';
import { Vector4, Color, Matrix4, Vector3, DoubleSide } from 'three'
import vertex from '../../shaders/fireA.vert?raw'
import fragment from '../../shaders/fireA.frag?raw'
import { watchEffect } from 'vue';

const props = withDefaults(defineProps<{
	position?: Array<Number>
	fireScale?: Number
	magnitude?: Number
	lacunarity?: Number
	gain?: Number
}>(), {
	fireScale: 60.0,
	position: [100, 19, 0],
	magnitude: 1.3,
	lacunarity: 2.0,
	gain: 1.0,
})


const { map: fireTex } = await useTexture({
	map: './plugins/digitalCity/image/fire.png'
})
const fireShader = {
	defines: {
		ITERATIONS: '20',
		OCTIVES: '3'
	},
	uniforms: {
		fireScale: { type: 'f', value: props.fireScale },
		offsetPositin: { type: 'f', value: props.position },
		fireTex: { type: 't', value: fireTex },
		color: { type: 'c', value: new Color(0xfff) },
		time: { type: 'f', value: 0.0 },
		seed: { type: 'f', value: Math.random() * 19.19 },
		invModelMatrix: { type: 'm4', value: new Matrix4() },
		scale: { type: 'v3', value: new Vector3(1, 1, 1) },
		noiseScale: { type: 'v4', value: new Vector4(1, 2, 1, 0.3) },
		magnitude: { type: 'f', value: props.magnitude },
		lacunarity: { type: 'f', value: props.lacunarity },
		gain: { type: 'f', value: props.gain }
	},
	vertexShader: vertex,
	fragmentShader: fragment,
	transparent: true,
	depthWrite: true,
	depthTest: true,
	side: DoubleSide
}
const { onLoop } = useRenderLoop()
onLoop(() => {
	fireShader.uniforms.time.value += 0.01
})
watchEffect(() => {
	if (props.fireScale) {
		fireShader.uniforms.fireScale.value = props.fireScale
	}
	if (props.magnitude) {
		fireShader.uniforms.magnitude.value = props.magnitude
	}
	if (props.lacunarity) {
		fireShader.uniforms.lacunarity.value = props.lacunarity
	}
	if (props.gain) {
		fireShader.uniforms.gain.value = props.gain
	}
})

</script>

<template>
	<TresMesh :position="props.position" :scale="[props.fireScale, props.fireScale, props.fireScale]" :renderOrder="9999">
		<TresSphereGeometry :args="[1, 32, 16]" />
		<!-- <TresBoxGeometry :args="[1, 1, 1]" /> -->
		<TresShaderMaterial v-bind="fireShader" />
	</TresMesh>
</template>

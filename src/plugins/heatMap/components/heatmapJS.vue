<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-08 10:41:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-08 14:04:46
-->
<script lang="ts" setup>
import { watchEffect, defineExpose } from 'vue';
import { DoubleSide, Texture } from 'three'
import h337 from 'heatmap.js-fix'
const props = withDefaults(
	defineProps<{
		position?: Array<number>
		Plane?: Array<number>
		show2dCanvas?: boolean
		heightRatio?: number
	}>(),
	{
		position: [0, 0, 0],
		Plane: [50, 50, 1000, 1000],
		show2dCanvas: true,
		heightRatio: 6
	},
)
let heatmap = null
const getRandom = (max: number, min: number) => {
	return Math.round((Math.random() * (max - min + 1) + min) * 10) / 10;
}

let heatmapCanvas = null
const initHeatmap = () => {
	heatmapCanvas = document.createElement("heatmap-canvas")
	heatmapCanvas.width = 100
	heatmapCanvas.height = 100
	heatmapCanvas.style.position = 'absolute'
	heatmapCanvas.style.top = '0'
	heatmapCanvas.style.left = '0'
	document.body.appendChild(heatmapCanvas)
	heatmap = h337.create({
		container: heatmapCanvas,
		width: 256,
		height: 256,
		blur: '.8',
		radius: 10
	});
	return heatmap
}
const setData = (data: Array) => {
	const max = 12
	if (data) {

	} else {
		let i = 0
		data = [];
		while (i < 2000) {
			data.push({ x: getRandom(1, 256), y: getRandom(1, 256), value: getRandom(1, 6) });
			i++;
		}
	}
	heatmap.setData({
		max,
		data
	});
	texture.needsUpdate = true
}
const texture = new Texture(initHeatmap()._renderer.canvas)
setData()
const shader = {
	transparent: true,
	side: DoubleSide,
	vertexShader: `
	uniform sampler2D heightMap;
	uniform float heightRatio;
	varying vec2 vUv;
	varying float hValue;
	varying vec3 cl;
	void main() {
	  vUv = uv;
	  vec3 pos = position;
	  cl = texture2D(heightMap, vUv).rgb;
	  hValue = texture2D(heightMap, vUv).r;
	  pos.y = hValue * heightRatio;
	  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
	}`,
	fragmentShader: `
	varying float hValue;
	varying vec3 cl;
	void main() {
		float v = abs(hValue - 1.);
		gl_FragColor = vec4(cl, .8 - v * v*1.1) ; 
	}`,
	uniforms: {
		heightMap: {
			type: 't',
			value: texture
		},
		heightRatio: { value: props.heightRatio }
	},
}
watchEffect(() => {
	heatmapCanvas.style.display = `${props.show2dCanvas ? 'block' : 'none'}`
	if (props.heightRatio) {
		shader.uniforms.heightRatio.value = props.heightRatio
	}
})
defineExpose({
	setData
})
// function onPointerMove(ev) {
// 	if (ev) {
// 		console.log(ev)
// 	}
// }
</script>
<template>
	<TresMesh :position="props.position">
		<!-- @pointer-move="onPointerMove" -->
		<!-- <BoxGeometry :args="[50, 10, 50]"></BoxGeometry> -->
		<TresPlaneGeometry :args="props.Plane" :rotate-x="-Math.PI * 0.5" />
		<TresShaderMaterial v-bind="shader" />
	</TresMesh>
</template>
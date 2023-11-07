<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-07 08:30:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-07 10:52:09
-->

<script setup lang="ts">
// import { ref } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane';
import { PCFSoftShadowMap, SRGBColorSpace, DoubleSide, Texture } from 'three'
import h337 from 'heatmap.js-fix' // https://github.com/dvarlan/heatmap.js-fix 修复过后的版本

const gl = {
	clearColor: '#030311',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	shadowMapType: PCFSoftShadowMap,
	useLegacyLights: true,
	antialias: true,
}
let heatmap = null
const getRandom = (max: number, min: number) => {
	return Math.round((Math.random() * (max - min + 1) + min) * 10) / 10;
}
const setData = () => {
	let i = 0
	const max = 10, data = [];
	while (i < 2000) {
		data.push({ x: getRandom(1, 256), y: getRandom(1, 256), value: getRandom(1, 6) });
		i++;
	}
	heatmap.setData({
		max,
		data
	});
}
const initHeatmap = () => {
	const heatmapCanvas = document.createElement("heatmap-canvas")
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
	setData()
	return heatmap
}
const texture = new Texture(initHeatmap()._renderer.canvas)
texture.needsUpdate = true
let play = true
useRenderLoop().onLoop(({ elapsed }) => {
	if (!play && parseInt(elapsed) % 2 == 1) {
		play = true
		setData()
		texture.needsUpdate = true
	}
	if (play && parseInt(elapsed) % 2 == 0) {
		play = false
	}
})
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
		gl_FragColor = vec4(cl, .8 - v * v) ; 
	}`,
	uniforms: {
		heightMap: {
			type: 't',
			value: texture
		},
		heightRatio: { value: 5 }
	},
}
const paneControl = new Pane({
	title: '参数',
	expanded: true,
});
paneControl.addBinding(shader.uniforms.heightRatio, 'value', {
	label: '高度', min: 1,
	max: 10,
	step: 1,
})
// function onPointerMove(ev) {
// 	if (ev) {
// 		console.log(ev)
// 	}
// }
</script>

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[21, 34, 55]" :fov="60" :near="1" :far="1000" />
		<OrbitControls :autoRotate="true" :autoRotateSpeed="2" />
		<TresAmbientLight color="#cccccc" :intensity="0.4" />
		<TresPointLight color="#ffffff" :intensity="0.8" />
		<TresGridHelper :args="[50, 25]" :position="[0, 0, 0]" />
		<TresMesh :position="[0, 0, 0]">
			<!-- @pointer-move="onPointerMove" -->
			<!-- <BoxGeometry :args="[50, 10, 50]"></BoxGeometry> -->
			<TresPlaneGeometry :args="[50, 50, 1000, 1000]" :rotate-x="-Math.PI * 0.5" />
			<TresShaderMaterial v-bind="shader" />
		</TresMesh>
	</TresCanvas>
</template>

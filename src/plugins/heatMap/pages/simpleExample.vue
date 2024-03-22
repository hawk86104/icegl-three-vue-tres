<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 18:53:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-07 10:07:44
-->

<script setup lang="ts">
// import { ref } from 'vue';
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { PCFSoftShadowMap, SRGBColorSpace, DoubleSide } from 'three'
import { getAlphaScaleMap, getPaletteMap } from '../common/simpleExampleGetTexture'

const gl = {
	clearColor: '#030311',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	shadowMapType: PCFSoftShadowMap,
	useLegacyLights: true,
}

useRenderLoop().onLoop(({ delta }) => {

})

const shader = {
	transparent: true,
	side: DoubleSide,
	vertexShader: `
	varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
	fragmentShader: `
	#ifdef GL_ES
  precision highp float;
  #endif
  varying vec2 vUv;
  uniform sampler2D alphaScaleMap;
  uniform sampler2D paletteMap;
  void main() {
    vec4 alphaColor = texture2D(alphaScaleMap, vUv);
    vec4 color = texture2D(paletteMap, vec2(alphaColor.a, 0.0));
    gl_FragColor = vec4(color.r, color.g, color.b, alphaColor.a);
	}`,
	uniforms: {
		'alphaScaleMap': {
			type: 't',
			value: getAlphaScaleMap()
		},
		'paletteMap': {
			type: 't',
			value: getPaletteMap()
		}
	}
}
function onPointerMove(ev) {
	if (ev) {
		console.log(ev)
	}
}
</script>

<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[0, 0, 3000]" :fov="40" :near="0.1" :far="10000" />
		<OrbitControls :autoRotate="true" :autoRotateSpeed="2" />
		<TresAmbientLight color="#eef0ff" :intensity="1" />

		<TresMesh :position="[0, 0, 10]" @pointer-move="onPointerMove">
			<TresPlaneGeometry :args="[1500, 1500]" />
			<!-- <MeshBasicMaterial color="red" :side="DoubleSide"></MeshBasicMaterial> -->
			<TresShaderMaterial v-bind="shader" />
		</TresMesh>
	</TresCanvas>
</template>

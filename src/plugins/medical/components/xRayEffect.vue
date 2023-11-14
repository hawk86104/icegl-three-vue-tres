<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-14 10:06:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-14 16:30:45
-->
<template>
	<TresMesh ref="TresMeshRef">
		<TresBufferGeometry></TresBufferGeometry>
		<TresShaderMaterial v-bind="xRayMaterial"></TresShaderMaterial>
	</TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useTexture, useRenderLoop, useTresContext } from '@tresjs/core'
// import xRayVertex from '../shaders/xRay.vert';
// import xRayFrag from '../shaders/xRay.frag';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { ref, watchEffect } from 'vue';

const props = withDefaults(defineProps<{
	model: THREE.Group
	color?: string
	opacity?: number
}>(), {
	color: '#84ccff',
	opacity: 1.0,
})

const xRayVertex = `
uniform float c;
uniform float p;
uniform float uTime;
varying float intensity;
varying  vec2 vUv;
void main(){
    vUv = uv;
    vec3 vNormal = normalize( normalMatrix * normal );
    intensity = pow(c - abs(dot(vNormal, vec3(0, 0, 1))), p);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
 }
`
const xRayFrag = `
uniform vec3 glowColor;
uniform sampler2D lightningTexture;
varying float intensity;
varying vec2 vUv;
uniform float offsetY;
uniform float uTime;
uniform float uOpacity;

void main(){
  vec2 uv=vUv;
  uv.y+=offsetY;
  vec3 glow=glowColor*intensity;
  vec3 color=vec3(step(.1,uv.y)-step(.2,uv.y))-vec3(texture2D(lightningTexture,uv));
  float alpha=clamp(cos(uTime*3.),.5,1.);
  gl_FragColor=vec4(glow+color,alpha*uOpacity);
}
`
const TresMeshRef = ref()
const brainBufferGeometries = [] as Array<THREE.BufferGeometry>
props.model.traverse((child) => {
	if (child instanceof THREE.Mesh) {
		child.geometry.verticesNeedUpdate = true
		brainBufferGeometries.push(child.geometry)
	}
})
const pTexture = (await useTexture({ map: './plugins/medical/image/brainXRayLight.png' })) as { map: THREE.Texture }
const xRayMaterial = {
	uniforms: {
		c: { type: 'f', value: 1.11 },
		p: { type: 'f', value: 1.0 },
		glowColor: { type: 'c', value: new THREE.Color(props.color) },
		lightningTexture: { type: 't', value: pTexture.map },
		offsetY: { type: 'f', value: 0.1 },
		uTime: { type: 'f', value: 0.0 },
		uOpacity: { type: 'f', value: props.opacity },
	},
	vertexShader: xRayVertex,
	fragmentShader: xRayFrag,
	side: THREE.DoubleSide,
	blending: THREE.AdditiveBlending,
	depthWrite: false,
}
xRayMaterial.uniforms.offsetY.value = Math.sin(5.0);
const { camera } = useTresContext()
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	if (camera.value.position && TresMeshRef.value) {
		xRayMaterial.uniforms.uTime.value += delta;
	}
})

watchEffect(() => {
	if (TresMeshRef.value) {
		TresMeshRef.value.geometry.dispose()
		TresMeshRef.value.geometry = BufferGeometryUtils.mergeGeometries(
			brainBufferGeometries
		);
		// TresMeshRef.value.geometry.computeVertexNormals()
		// TresMeshRef.value.geometry.normalizeNormals()
		// TresMeshRef.value.geometry.computeTangents()
	}
	if (props.color) {
		xRayMaterial.uniforms.glowColor.value = new THREE.Color(props.color)
	}
	if (props.opacity) {
		xRayMaterial.uniforms.uOpacity.value = props.opacity
	}
});
</script>
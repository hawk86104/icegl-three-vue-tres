<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-14 10:06:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-17 10:24:46
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
import xRayVertex from '../shaders/xRay.vert?raw';
import xRayFrag from '../shaders/xRay.frag?raw';
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
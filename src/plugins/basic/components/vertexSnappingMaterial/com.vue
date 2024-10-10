<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 08:29:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 09:49:12
-->
<template>
	<primitive :object="srcMaterial" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { toRef, watch } from 'vue'

const props = withDefaults(
	defineProps<{
			uSnappingResolution?: number
			srcMaterial?: THREE.Material
	}>(),
	{
			uSnappingResolution: 6,
			srcMaterial: () => {
					return new THREE.MeshStandardMaterial({
							color: 0x00ff00,
							roughness: 0.5,
							metalness: 0.5,
					})
			},
	},
)
const snappingResolutionRef = toRef(props.uSnappingResolution)
props.srcMaterial.onBeforeCompile = (material) => {
	material.uniforms.uSnappingResolution = snappingResolutionRef
	material.vertexShader = material.vertexShader.replace(
			'#include <common>',
			`
			#include <common>
			uniform float uSnappingResolution;
	`,
	)
	material.vertexShader = material.vertexShader.replace(
			'#include <project_vertex>',
			`
			vec4 mvPosition = vec4( transformed, 1.0 );

			#ifdef USE_BATCHING
				mvPosition = batchingMatrix * mvPosition;
			#endif

			#ifdef USE_INSTANCING
				mvPosition = instanceMatrix * mvPosition;
			#endif

			mvPosition = modelMatrix * mvPosition;

			mvPosition = vec4(
				round(mvPosition.x * uSnappingResolution) / uSnappingResolution,
				round(mvPosition.y * uSnappingResolution) / uSnappingResolution,
				round(mvPosition.z * uSnappingResolution) / uSnappingResolution,
				1.0);
			mvPosition = viewMatrix * mvPosition;
			gl_Position = projectionMatrix * mvPosition;
	`,
	)
}

watch(
	() => props.uSnappingResolution,
	(newValue) => {
			snappingResolutionRef.value = newValue
	},
)
</script>

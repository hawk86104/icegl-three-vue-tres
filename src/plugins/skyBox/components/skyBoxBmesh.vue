<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:23:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-26 15:18:24
-->

<template>
	<TresMesh>
		<TresBoxGeometry :args="[props.size, props.size, props.size]" />
		<TresShaderMaterial v-bind="tsMaterial" />
	</TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { loadHDR } from '../common/utils'

const props = withDefaults(defineProps<{
	texture: string
	size?: number
}>(), {
	size: 1000
})

const pTexture = await loadHDR(props.texture)

pTexture.wrapS = pTexture.wrapT = THREE.ClampToEdgeWrapping
pTexture.generateMipmaps = false
pTexture.magFilter = THREE.LinearFilter
pTexture.minFilter = THREE.LinearFilter

const tsMaterial = {
	uniforms: {
		uSkybox: { type: "t", value: pTexture }
	},
	side: THREE.BackSide,
	vertexShader: `
		varying vec3 vFragPos;

		void main() {
				vFragPos = position.xyz;
				vec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);
				viewSpace.w = 1.0;
				gl_Position = projectionMatrix * viewSpace;    
		}`,

	fragmentShader: `
		uniform sampler2D uSkybox;
		varying vec3 vFragPos;
		const float PI = 3.14159265359;
		void main() {
				vec3 dir = normalize(vFragPos);
				float v = (asin(dir.y) + PI * 0.5) / (PI); 
				float u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);
				gl_FragColor = texture2D(uSkybox, vec2(u, v));
		}`,
	depthWrite: true,
}
</script>
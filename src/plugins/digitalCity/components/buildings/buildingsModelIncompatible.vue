<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-25 11:15:30
-->
<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { watchEffect } from 'vue';
import * as THREE from 'three'
// import { toRaw } from 'vue'
const props = withDefaults(defineProps<{
	model: any
	bulidingsColor?: string
	landColor?: string
	opacity?: number
}>(), {
	bulidingsColor: '#EC5BFF',
	landColor: '#112233',
	opacity: 0.9
})
const timeDelta = { value: 0 }
const CITY_UNTRIANGULATED = props.model.city
const LANDMASS = props.model.land
const setColorMaterial = (type: any, param: string) => {
	let materials
	if (type === 'cu') {
		// 设置城市建筑（mesh物体），材质基本颜色
		materials = Array.isArray(CITY_UNTRIANGULATED.material) ? CITY_UNTRIANGULATED.material : [CITY_UNTRIANGULATED.material]
		materials.forEach((material) => {
			if (param === 'color') {
				material[param].setStyle(props.bulidingsColor);
			} else if (param === 'opacity') {
				material.opacity = props.opacity;
				material.transparent = true;
			}
			// material.blending = THREE.NormalBlending,
			material.side = THREE.DoubleSide //双面渲染
		})
	} else if (type === 'land') {
		// 设置城市地面（mesh物体），材质基本颜色
		materials = Array.isArray(LANDMASS.material) ? LANDMASS.material : [LANDMASS.material]
		materials.forEach((material) => {
			// material.opacity = 0.8;
			// material.transparent = true;
			material[param].setStyle(props.landColor);
			material.side = THREE.DoubleSide //双面渲染
		})
	}
}
const setEffectMaterial = () => {
	const { geometry } = CITY_UNTRIANGULATED;
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	const { max, min } = geometry.boundingBox;
	const materials = Array.isArray(CITY_UNTRIANGULATED.material) ? CITY_UNTRIANGULATED.material : [CITY_UNTRIANGULATED.material]
	materials.forEach((material) => {
		material.onBeforeCompile = (shader) => {
			shader.uniforms.uMax = {
				value: max
			}
			shader.uniforms.uMin = {
				value: min
			}
			shader.uniforms.uLightColor = {
				value: new THREE.Color('#ffffff')
			}
			shader.uniforms.uBorderWidth = {
				value: 5
			}
			shader.uniforms.uCircleTime = {
				value: 5
			}
			shader.uniforms.uTime = timeDelta
			const vertex = `
	varying vec4 vPosition;
	void main() {
		 vPosition = modelMatrix * vec4(position,1.0);
`
			shader.vertexShader = shader.vertexShader.replace("void main() {", vertex);
			// 补充颜色渐变动画需要的各种变量
			const fragment = `
	uniform mat4 modelMatrix;
  varying vec4 vPosition;
	uniform vec3 uMax; 
	uniform vec3 uMin; 
	uniform float uBorderWidth; 
	uniform vec3 uLightColor;
	uniform float uCircleTime; 
	uniform float uTime; 
	vec4 uMax_world;
	vec4 uMin_world;

	void main() {
		// 转世界坐标
		uMax_world =  modelMatrix * vec4(uMax,1.0);
		uMin_world =  modelMatrix * vec4(uMin,1.0);
`;
			const fragmentColor = `
#include <dithering_fragment>
	vec3 distColor = outgoingLight;
	float residue = uTime - floor(uTime / uCircleTime) * uCircleTime;
	float rate = residue / uCircleTime;
	float lightOffset = rate * (uMax_world.y - uMin_world.y);

	if (uMin_world.y + lightOffset < vPosition.y && uMin_world.y + lightOffset + uBorderWidth > vPosition.y) {
		gl_FragColor = vec4(uLightColor, diffuseColor.a);
	} else {
		gl_FragColor = vec4(distColor, diffuseColor.a);
	}
`;
			shader.fragmentShader = shader.fragmentShader.replace("void main() {", fragment)
			shader.fragmentShader = shader.fragmentShader.replace("#include <tonemapping_fragment>", fragmentColor);
		}
	})
}
// setColorMaterial()
setEffectMaterial()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
	timeDelta.value += delta;
	// timeDelta.value = 0.2;
})
watchEffect(() => {
	if (props.bulidingsColor) {
		setColorMaterial('cu', 'color')
	}
	if (props.landColor) {
		setColorMaterial('land', 'color')
	}
	if (props.opacity) {
		setColorMaterial('cu', 'opacity')
	}
});
</script>

<template>
	<primitive :object="props.model.model.clone()">
	</primitive>
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-17 15:16:25
-->
<script setup>
import { useRenderLoop } from '@tresjs/core'
import { useFBX } from '@tresjs/cientos';
import * as THREE from 'three'

const path = './plugins/superzay/belt/model/shanghai.FBX';
const model = await useFBX(path);

const timeDelta = { value: 0 }
const setColorMaterial = () => {
	model.traverse((child) => {
		// 设置城市建筑（mesh物体），材质基本颜色
		if (child.name === 'CITY_UNTRIANGULATED') {
			const materials = Array.isArray(child.material) ? child.material : [child.material]
			materials.forEach((material) => {
				material.opacity = 0.8;
				material.transparent = true;
				material.color.setStyle("#EC5BFF");
			})
		}
		// 设置城市地面（mesh物体），材质基本颜色
		if (child.name === 'LANDMASS') {
			const materials = Array.isArray(child.material) ? child.material : [child.material]
			materials.forEach((material) => {
				material.opacity = 0.8;
				// material.transparent = true;
				material.color.setStyle("#040912");
			})
		}
	})
}
const setEffectMaterial = () => {
	let cityBuildings = null// 城市建筑群
	model.traverse((child) => {
		if (child.name !== 'CITY_UNTRIANGULATED') return
		cityBuildings = child
	})
	const { geometry } = cityBuildings;
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	const { max, min } = geometry.boundingBox;
	const materials = Array.isArray(cityBuildings.material) ? cityBuildings.material : [cityBuildings.material]
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
			//timeDelta
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
setColorMaterial()
setEffectMaterial()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
	timeDelta.value += delta;
})
</script>

<template>
	<Suspense>
		<primitive :object="model" />
	</Suspense>
</template>

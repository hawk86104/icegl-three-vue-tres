<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-23 15:48:35
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-23 17:29:54
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRenderLoop } from '@tresjs/core'
const { onLoop } = useRenderLoop()

const MeshPhongMaterialRef = ref()
const timeDelta = { value: 0 }
const setMaterialShader = () => {
	MeshPhongMaterialRef.value.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, {
			uSpeed: {
				value: 300,
			},
			uRadius: {
				value: 240
			},
			uTime: timeDelta,
			uFollowWidth: {
				value: 220
			}
		})
		const vertex = `
	varying vec3 vPosition;
	void main() {
		vPosition = position;

`
		shader.vertexShader = shader.vertexShader.replace('void main() {', vertex)
		const fragment = `
	uniform float uRadius;     
	uniform float uTime;            
	uniform float uSpeed; 
	uniform float uFollowWidth; 
	varying vec3 vPosition;
	float calcAngle(vec3 oFrag){
		float fragAngle;
		const vec3 ox = vec3(1,0,0);
		float dianji = oFrag.x * ox.x + oFrag.z*ox.z;
		float oFrag_length = length(oFrag); // length是内置函数
		float ox_length = length(ox); // length是内置函数
		float yuxian = dianji / (oFrag_length * ox_length);
		fragAngle = acos(yuxian);
		fragAngle = degrees(fragAngle);
		if(oFrag.z > 0.0) {
			fragAngle = -fragAngle + 360.0;
		}
		float scanAngle = uTime * uSpeed - floor(uTime * uSpeed / 360.0) * 360.0;
		float angle = scanAngle - fragAngle;
		if(angle < 0.0){
			angle = angle + 360.0;
		}
		return angle;
	}
	void main() {
`
		const fragementColor = `
	// length内置函数，取向量的长度
	if(length(vPosition) == 0.0 || length(vPosition) > uRadius-3.0){
		gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	} else {
		float angle = calcAngle(vPosition);
		if(angle < uFollowWidth){
			// 尾焰区域
			float opacity =  1.0 - angle / uFollowWidth; 
			gl_FragColor = vec4( outgoingLight, diffuseColor.a * opacity );  
		} else {
			// 其他位置的像素均为透明
			gl_FragColor = vec4( outgoingLight, 0.0 ); 
		}
	}
	#include <colorspace_fragment>\n\t
`
		shader.fragmentShader = shader.fragmentShader.replace('void main() {', fragment)
		// shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>\n\t', fragementColor)
		shader.fragmentShader = shader.fragmentShader.replace('#include <colorspace_fragment>\n\t', fragementColor)
	}
}
watchEffect(() => {
	if (MeshPhongMaterialRef.value) {
		setMaterialShader()
	}
})
onLoop(({ delta }) => {
	timeDelta.value += delta;
})
</script>

<template>
	<TresMesh :rotation="[-Math.PI / 180 * 90, 0, 0]" :position="[0, 120, 0]">
		<CircleGeometry :args="[240, 1000]" />
		<MeshPhongMaterial ref="MeshPhongMaterialRef" color="#ffff00" opacity="0.7" :transparent="true" />
	</TresMesh>
</template>

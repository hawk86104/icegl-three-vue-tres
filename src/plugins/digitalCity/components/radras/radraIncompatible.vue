<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-23 15:48:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-23 18:38:51
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRenderLoop } from '@tresjs/core'
import { Matrix4 } from 'three';

const { onLoop } = useRenderLoop()
const timeDelta = { value: 0 }
const MeshPhongMaterialRef = ref()
const TresCircleGeometryRef = ref()
onLoop(({ delta }) => {
	timeDelta.value += delta;
})
// 定义雷达参数  
const radarData = {
	radius: 240,
	color: '#ffff00',
	opacity: 0.5,
	speed: 300,
	followWidth: 220,
}

watchEffect(() => {
	if (TresCircleGeometryRef.value) {
		const rotateMatrix = new Matrix4().makeRotationX(-Math.PI / 180 * 90)
		TresCircleGeometryRef.value.applyMatrix4(rotateMatrix)
	}
	if (MeshPhongMaterialRef.value) {
		MeshPhongMaterialRef.value.onBeforeCompile = (shader) => {
			Object.assign(shader.uniforms, {
				uSpeed: {
					value: radarData.speed,
				},
				uRadius: {
					value: radarData.radius
				},
				uTime: timeDelta,
				uFollowWidth: {
					value: radarData.followWidth
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
	if(length(vPosition) == 0.0 || length(vPosition) > uRadius-2.0){
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
			shader.fragmentShader = shader.fragmentShader.replace('#include <colorspace_fragment>\n\t', fragementColor)
		}
	}
})
</script>

<template>
	<TresMesh :position="[0, 80, 0]">
		<CircleGeometry ref="TresCircleGeometryRef" :args="[240, 1000]" />
		<MeshPhongMaterial ref="MeshPhongMaterialRef" color="#ffff00" opacity="0.7" :transparent="true" />
	</TresMesh>
</template>

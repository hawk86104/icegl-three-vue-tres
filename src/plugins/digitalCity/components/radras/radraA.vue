<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-23 15:48:35
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-24 11:23:09
-->
<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import { useRenderLoop } from '@tresjs/core'
import { Matrix4, AdditiveBlending, DoubleSide, Color } from 'three';
const props = withDefaults(
	defineProps<{
		position?: Array<number>
		radius?: number
		color?: string
		opacity?: number
		speed?: number
		followWidth?: number
	}>(),
	{
		position: [0, 0, 0],
		radius: 240,
		color: '#ffff00',
		opacity: 0.5,
		speed: 300,
		followWidth: 220,
	},
)

const { onLoop } = useRenderLoop()
const timeDelta = { value: 0 }
const TresCircleGeometryRef = ref()
onLoop(({ delta }) => {
	timeDelta.value += delta;
})
const shader = {
	transparent: true,
	blending: AdditiveBlending,
	depthWrite: true,
	side: DoubleSide,
	depthTest: true,
	vertexShader: `
	varying vec3 vPosition;
	void main() {
		vPosition = position;
		vec4 modelPosition = modelMatrix * vec4(position, 1.0);
		vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
  }
  `,
	fragmentShader: `
	uniform float uRadius;     
  uniform float uTime;            
  uniform float uSpeed; 
  uniform float uFollowWidth; 
  varying vec3 vPosition;
	uniform vec3 ncolor;
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
			// length内置函数，取向量的长度
		if(length(vPosition) == 0.0 || length(vPosition) > uRadius-2.0){
			gl_FragColor = vec4( ncolor, 1.0 );
		} else {
			float angle = calcAngle(vPosition);
			if(angle < uFollowWidth){
				// 尾焰区域
				float opacity =  1.0 - angle / uFollowWidth; 
				gl_FragColor = vec4( ncolor, 1.0 * opacity );  
			} else {
				// 其他位置的像素均为透明
				gl_FragColor = vec4( ncolor, 0.0 ); 
			}
		}
	}
  `,
	uniforms: {
		uSpeed: { value: props.speed },
		uRadius: { value: props.radius },
		uTime: timeDelta,
		uFollowWidth: { value: props.followWidth },
		ncolor: { value: new Color(props.color) },
	},
}
watch(TresCircleGeometryRef, (newValue, oldValue) => {
	if (newValue && oldValue === undefined) {
		const rotateMatrix = new Matrix4().makeRotationX(-Math.PI / 180 * 90)
		TresCircleGeometryRef.value.applyMatrix4(rotateMatrix)
	}
})
const MeshRef = ref()
defineExpose({
	MeshRef
})
</script>

<template>
	<TresMesh ref="MeshRef" :position="props.position">
		<TresCircleGeometry ref="TresCircleGeometryRef" :args="[240, 1000]" />
		<TresShaderMaterial v-bind="shader" />
	</TresMesh>
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-24 10:36:23
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-25 11:18:53
-->
<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import { useRenderLoop } from '@tresjs/core'
import { DoubleSide, Color, LineCurve3, Vector3, Matrix4 } from 'three';
const props = withDefaults(
	defineProps<{
		position?: Array<number>
		radius?: number
		maxRadius?: number
		color?: string
		opacity?: number
		period?: number
		height?: number
	}>(),
	{
		position: [0, 0, 0],
		radius: 120,
		maxRadius: 450,
		color: '#ffff00',
		opacity: 0.5,
		period: 2,
		height: 200,
	},
)

const MeshRef = ref()
const uMax = ref(1.0)
const uMin = ref(0.1)
const shader = {
	color: props.color,
	opacity: props.opacity,
	transparent: true,
	depthWrite: false,
	depthTest: true,
	side: DoubleSide,
	vertexShader: `
	varying vec4 vPosition;
  void main() {
    vPosition = modelMatrix * vec4(position,1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
	fragmentShader: `
	uniform vec3 uColor; // 光墙半径        
  uniform vec3 uMax; 
  uniform vec3 uMin;
  uniform mat4 modelMatrix; // 世界矩阵
  varying vec4 vPosition; // 接收顶点着色传递进来的位置数据
  void main() {
    // 转世界坐标
    vec4 uMax_world = modelMatrix * vec4(uMax,1.0);
    vec4 uMin_world = modelMatrix * vec4(uMin,1.0);
    // 根据像素点世界坐标的y轴高度,设置透明度
    float opacity =1.0 - (vPosition.y - uMin_world.y) / (uMax_world.y -uMin_world.y); 
    gl_FragColor = vec4( uColor, opacity);
  }
  `,
	uniforms: {
		uMax: uMax,
		uMin: uMin,
		uColor: {
			value: new Color(props.color)
		}
	},
}
const TresTubeGeometryRef = ref()
let originScale = null
watch(TresTubeGeometryRef, (newValue, oldValue) => {
	if (newValue && oldValue === undefined) {
		TresTubeGeometryRef.value.computeBoundingBox()
		uMax.value = TresTubeGeometryRef.value.boundingBox.max;
		uMin.value = TresTubeGeometryRef.value.boundingBox.min
		originScale = MeshRef.value.scale.clone()
	}
})
const { onLoop } = useRenderLoop()
const timeDelta = { value: 0 }
onLoop(({ delta }) => {
	timeDelta.value += delta;
	const rate = (timeDelta.value % props.period) / props.period

	const currRadius = rate * (props.maxRadius - props.radius) + props.radius
	const scaleRate = currRadius / props.radius
	const matrix = new Matrix4().makeScale(scaleRate, 1, scaleRate)
	if (originScale) {
		MeshRef.value.scale.copy(originScale.clone().applyMatrix4(matrix))
		MeshRef.value.updateMatrix()
	}
})
defineExpose({
	MeshRef
})
const tubePath = ref(new LineCurve3(
	new Vector3(0, 0, 0),
	new Vector3(0, props.height, 0)
));
</script>

<template>
	<TresMesh ref="MeshRef" :position="props.position">
		<TresTubeGeometry ref="TresTubeGeometryRef" :args="[tubePath, 20, props.radius, 220, false]" />
		<TresShaderMaterial v-bind="shader" />
	</TresMesh>
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-17 15:29:48
-->
<template>
    <TresMesh :renderOrder="2200" ref="tresMeshRef">
        <TresBufferGeometry :position="[positionArray, 3]" :uv="[uvArray, 2]" />
        <TresShaderMaterial v-bind="rippleShader" />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { watchEffect, ref, watch } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { getcenterPoint } from '../../common/utils'

const props = withDefaults(
    defineProps<{
        positionSrc?: Array<Object>
        color?: string
        opacity?: number
        height?: number
        frequencyNum?: number
        speed?: number
    }>(),
    {
        positionSrc: [
            { x: 0, y: 0 },
            { x: 10, y: 10 },
        ],
        color: '#ffff00',
        opacity: 0.8,
        height: 100,
        frequencyNum: 8,
        speed: 1,
    },
)

const tresMeshRef = ref<THREE.Mesh>()

const rippleShader = {
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    vertexShader: `
varying vec2 vUv; 
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`,
    fragmentShader: `
	uniform float uTime;
	varying vec2 vUv;
	#define PI 3.14159265
  uniform float speed;
  uniform vec3 color;
  uniform float opacity;
  uniform float frequencyNum;
	void main(){
			
	float amplitude = 1.;

	float x = vUv.x;
	float y = sin(x * frequencyNum) ;
	float t = 0.01*(-uTime*130.0*speed);
	y += sin(x*frequencyNum*2.1 + t)*4.5;
	y += sin(x*frequencyNum*1.72 + t*1.121)*4.0;
	y += sin(x*frequencyNum*2.221 + t*0.437)*5.0;
	y += sin(x*frequencyNum*3.1122+ t*4.269)*2.5;
	y *= amplitude*0.06;
	y /= 3.;
	y += 0.55;

	float ap = step(vUv.y,y) * (y-vUv.y)/y;

	gl_FragColor = vec4(color,ap*opacity);
}
	`,
    uniforms: {
        uTime: {
            type: 'pv2',
            value: 0,
        },
        color: {
            type: 'uvs',
            value: new THREE.Color(props.color),
        },
        opacity: {
            type: 'pv2',
            value: props.opacity,
        },
        frequencyNum: {
            type: 'pv2',
            value: props.frequencyNum,
        },
        speed: {
            type: 'pv2',
            value: props.speed,
        },
    },
}

let positionArray = null as any
let uvArray = null as any
function getRippleGeometry(points = [] as Array<any>, height: number) {
    const positions = [] as Array<any>
    const uvs = [] as Array<any>
    for (let i = 0, j = positions.length, t = uvs.length; i < points.length - 1; i++) {
        let vUvyMax = 1
        let left = points[i]
        let right = points[i + 1]
        positions[j++] = left.x
        positions[j++] = 0
        positions[j++] = left.y
        uvs[t++] = 0
        uvs[t++] = 0

        positions[j++] = right.x
        positions[j++] = 0
        positions[j++] = right.y
        uvs[t++] = 1
        uvs[t++] = 0

        positions[j++] = left.x
        positions[j++] = height
        positions[j++] = left.y
        uvs[t++] = 0
        uvs[t++] = vUvyMax

        positions[j++] = left.x
        positions[j++] = height
        positions[j++] = left.y
        uvs[t++] = 0
        uvs[t++] = vUvyMax

        positions[j++] = right.x
        positions[j++] = 0
        positions[j++] = right.y
        uvs[t++] = 1
        uvs[t++] = 0

        positions[j++] = right.x
        positions[j++] = height
        positions[j++] = right.y
        uvs[t++] = 1
        uvs[t++] = vUvyMax
    }
    positionArray = new Float32Array(positions)
    uvArray = new Float32Array(uvs)
}

// //  不能直接根据坐标点上围墙，因为会出现深度问题 导致闪烁
//首先找到所有点的中心点 然后更改每个点对应中心点的偏移量
const { centerPoint, points } = getcenterPoint(props.positionSrc)

getRippleGeometry(points, props.height)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    rippleShader.uniforms.uTime.value += delta
})
watchEffect(() => {
    if (props.color) {
        rippleShader.uniforms.color.value = new THREE.Color(props.color)
    }
    if (props.opacity) {
        rippleShader.uniforms.opacity.value = props.opacity
    }
    if (props.frequencyNum) {
        rippleShader.uniforms.frequencyNum.value = props.frequencyNum
    }
    if (props.speed) {
        rippleShader.uniforms.speed.value = props.speed
    }
    if (tresMeshRef.value) {
        tresMeshRef.value.position.set(centerPoint.x, tresMeshRef.value.position.y, centerPoint.y)
    }
})

watch(
    () => props.height,
    (height) => {
        getRippleGeometry(points, props.height)
        if (tresMeshRef.value) {
            tresMeshRef.value.position.set(centerPoint.x, tresMeshRef.value.position.y, centerPoint.y)
        }
    },
)
</script>

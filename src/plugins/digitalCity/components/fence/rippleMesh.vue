<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 17:57:24
-->
<template>
	<TresMesh :renderOrder="2200" ref="tresMeshRef">
		<TresBufferGeometry :position="[positionArray, 3]" :uv="[uvArray, 2]" />
		<TresShaderMaterial v-bind="rippleShader" />
	</TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { watchEffect, ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { getcenterPoint } from '../../common/utils'

const props = withDefaults(
	defineProps<{
		positionSrc?: Array<Object>
		color?: string
		opacity?: number
		height?: number
		num?: number
		speed?: number
	}>(),
	{
		positionSrc: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
		color: '#ffff00',
		opacity: 0.8,
		height: 100,
		num: 8,
		speed: 0.15
	},
)

const tresMeshRef = ref<THREE.Mesh>()

const rippleShader = {
	side: THREE.DoubleSide,
	transparent: true,
	depthWrite: false,
	depthTest: true,
	vertexShader: `
precision lowp float;
precision lowp int;
${THREE.ShaderChunk.fog_pars_vertex}
varying vec2 vUv;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    ${THREE.ShaderChunk.fog_vertex}
}
`,
	fragmentShader: `
  precision lowp float;
  precision lowp int;
  uniform float time;
  uniform float opacity;
  uniform vec3 color;
  uniform float num;
  uniform float speed;
  varying vec2 vUv;
  void main() {
    vec4 fragColor = vec4(0.);
    float sin = sin((vUv.y - time * speed) * 10. * num);
    float high = 0.92;
    float medium = 0.4;
    if (sin > high) {
      fragColor = vec4(mix(vec3(.8, 1., 1.), color, (1. - sin) / (1. - high)), 1.);
    } else if(sin > medium) {
      fragColor = vec4(color, mix(1., 0., 1.-(sin - medium) / (high - medium)));
    } else {
      fragColor = vec4(color, 0.);
    }
    vec3 fade = mix(color, vec3(0., 0., 0.), vUv.y);
    fragColor = mix(fragColor, vec4(fade, 1.), 0.85);
    gl_FragColor = vec4(fragColor.rgb, fragColor.a * opacity * (1. - vUv.y));
  }
	`,
	uniforms: {
		time: {
			type: "pv2",
			value: 0
		},
		color: {
			type: "uvs",
			value: new THREE.Color(props.color)
		},
		opacity: {
			type: "pv2",
			value: props.opacity
		},
		num: {
			type: "pv2",
			value: props.num
		},
		speed: {
			type: "pv2",
			value: props.speed
		}
	}
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
	rippleShader.uniforms.time.value += delta
})
watchEffect(() => {
	if (props.color) {
		rippleShader.uniforms.color.value = new THREE.Color(props.color)
	}
	if (props.opacity) {
		rippleShader.uniforms.opacity.value = props.opacity
	}
	if (props.num) {
		rippleShader.uniforms.num.value = props.num
	}
	if (props.speed) {
		rippleShader.uniforms.speed.value = props.speed
	}
	if (tresMeshRef.value) {
		tresMeshRef.value.position.set(centerPoint.x, tresMeshRef.value.position.y, centerPoint.y)
	}
})

</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 17:55:51
-->
<template>
	<primitive :object="fakeGlowMesh" :renderOrder="9999" :rotation-x="Math.PI / 2" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { resetUV } from '../../common/utils'

const props = withDefaults(
	defineProps<{
		positionSrc?: Array<Array>
		color?: string
	}>(),
	{
		positionSrc: [[0, 0], [1, 1]],
		color: '#ffff00',
	},
)

const shape = new THREE.Shape()
props.positionSrc.forEach((item, idx) => {
	if (idx === 0) shape.moveTo(item[0], item[1])
	else shape.lineTo(item[0], item[1])
})

const material = new THREE.ShaderMaterial({
	vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	fragmentShader: `
    varying vec2 vUv;
		uniform vec3 color;
    void main() {
			// 计算距离四条边的最小距离
        float distance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));

        // 将距离映射到透明度（从边缘到中心逐渐变透明）
        float alpha = smoothstep(0.0, 0.1, distance);

        // 设置最终颜色和透明度
        gl_FragColor = vec4(color, 1.0-alpha);
    }
  `,
	transparent: true,
	side: THREE.DoubleSide,
	depthWrite: false,
	depthTest: true,
	uniforms: {
		color: {
			type: "uvs",
			value: new THREE.Color(props.color)
		},
	}
})

let geometry = new THREE.ShapeGeometry(shape)
// let geometry = new THREE.PlaneGeometry(50, 50)
debugger
resetUV(geometry)
debugger
const fakeGlowMesh = new THREE.Mesh(
	geometry,
	material
	// new THREE.MeshBasicMaterial({
	// 	color: 0x00ff00,
	// 	transparent: true,
	// 	side: THREE.DoubleSide,
	// }),
)



</script>
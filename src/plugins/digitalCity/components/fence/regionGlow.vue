<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:30:25
-->
<template>
	<TresGroup>
		<primitive :object="fakeGlowMesh" :renderOrder="9999" :rotation-x="Math.PI / 2" />
		<primitive :object="line2Mesh" :renderOrder="9999" :rotation-x="Math.PI / 2" />
	</TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { resetUV } from '../../common/utils'
import { watchEffect } from 'vue'

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
        float distance = max(max(vUv.x, -vUv.x), max(vUv.y, -vUv.y));

        // 将距离映射到透明度（从边缘到中心逐渐变透明）
        float alpha = smoothstep(0.1, 0.9, distance*1.1);

        // 设置最终颜色和透明度
        gl_FragColor = vec4(color, alpha);
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
resetUV(geometry, true)
const fakeGlowMesh = new THREE.Mesh(
	geometry,
	material
	// new THREE.MeshBasicMaterial({
	// 	color: 0x00ff00,
	// 	transparent: true,
	// 	side: THREE.DoubleSide,
	// }),
)

const linePoints = shape.getPoints()
const lineGeometry = new LineGeometry()
lineGeometry.setPositions(linePoints.flatMap(p => [p.x, p.y, 0]))

var lineMaterial = new LineMaterial({
	color: new THREE.Color(props.color), linewidth: 0.002
})
const line2Mesh = new Line2(lineGeometry, lineMaterial)

watchEffect(() => {
	material.uniforms.color.value = new THREE.Color(props.color)
	lineMaterial.color = new THREE.Color(props.color)
})
</script>
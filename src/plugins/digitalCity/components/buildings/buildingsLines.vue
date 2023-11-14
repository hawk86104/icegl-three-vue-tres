<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-14 09:20:42
-->
<script setup lang="ts">
import { Color, EdgesGeometry, ShaderMaterial } from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

import { watchEffect } from 'vue';
const props = withDefaults(
	defineProps<{
		builds: any
		width?: number
		color?: string
		opacity?: number
		style?: string
	}>(),
	{
		width: 1.0,
		color: '#FFF',
		opacity: 1.0,
		style: 'Wireframe' // Wireframe / Shader
	},
)
let line = null as any
let shader = null as any
if (props.style === 'Wireframe') {
	const edges = new EdgesGeometry(props.builds.geometry) // WireframeGeometry
	let geometry = new LineSegmentsGeometry()
	let wideEdges = geometry.fromEdgesGeometry(edges)
	let edgesmaterial = new LineMaterial({
		color: props.color,
		linewidth: props.width,
		opacity: props.opacity,
		transparent: true,
		depthWrite: true,
		depthTest: true,
	})
	edgesmaterial.resolution.set(window.innerWidth, window.innerHeight);
	line = new LineSegments2(wideEdges, edgesmaterial);
	line.applyMatrix4(props.builds.matrix.clone())
	// line.position.copy(props.builds.getWorldPosition())

} else {
	shader = {
		transparent: true,
		uniforms: {
			uColor: {
				value: new Color(props.color)
			},
			uOpacity: {
				value: props.opacity
			}
		},
		vertexShader: `
       void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
		fragmentShader: ` 
        uniform vec3 uColor;
				uniform float uOpacity;
        void main() {
          gl_FragColor = vec4(uColor, uOpacity);
        }
      `
	}
	const geometry = new EdgesGeometry(props.builds.geometry)
	const surroundLineMaterial = new ShaderMaterial(shader)
	line = new LineSegments(geometry, surroundLineMaterial);
	line.applyMatrix4(props.builds.matrix.clone())
	line.material.linewidth = props.width
	line.renderOrder = 1000
}
watchEffect(() => {
	if (props.style === 'Shader') {
		if (props.color) {
			shader.uniforms.uColor.value = new Color(props.color)
		}
		if (props.opacity) {
			shader.uniforms.uOpacity.value = props.opacity
		}
	}
	if (props.style === 'Wireframe') {
		if (props.color) {
			line.material.color = new Color(props.color)
		}
		if (props.opacity) {
			line.material.opacity = props.opacity
		}
	}
	if (props.width) {
		line.material.linewidth = props.width
	}
});
</script>

<template>
	<primitive :object="line" />
</template>

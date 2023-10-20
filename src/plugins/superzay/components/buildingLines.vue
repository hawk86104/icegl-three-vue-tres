<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-20 15:47:17
-->
<script setup lang="ts">
import { WireframeGeometry, LineSegments, Color, EdgesGeometry, ShaderMaterial } from 'three';
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
		width: 10000.0,
		color: '#FFF',
		opacity: 1.0,
		style: 'Shader' // Wireframe / Shader
	},
)
let line = null as any
let shader = null as any
if (props.style === 'Wireframe') {
	const wireframe = new EdgesGeometry(props.builds.geometry); // WireframeGeometry
	line = new LineSegments(wireframe);
	line.material.depthTest = true;
	line.material.opacity = props.opacity;
	line.material.transparent = true;
	line.material.linewidth = props.width
	line.applyMatrix4(props.builds.matrix.clone())
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
}
watchEffect(() => {
	if (props.style === 'Shader') {
		if (props.color) {
			shader.uniforms.uColor.value = new Color(props.color)
		}
		if (props.width) {
			line.material.linewidth = props.width
		}
		if (props.opacity) {
			shader.uniforms.uOpacity.value = props.opacity
		}
	}
});
</script>

<template>
	<primitive :object="line" />
</template>

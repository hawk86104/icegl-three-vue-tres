<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-20 11:43:05
-->
<script setup lang="ts">
import { WireframeGeometry, LineSegments, Color, EdgesGeometry, ShaderMaterial } from 'three';
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
if (props.style === 'Wireframe') {
	const wireframe = new WireframeGeometry(props.builds.geometry);
	const line = new LineSegments(wireframe);
	line.material.depthTest = true;
	line.material.opacity = props.opacity;
	line.material.transparent = true;
	line.material.linewidth = props.width
	props.builds.add(line);
} else {
	debugger
	const shader = {
		transparent: true,
		uniforms: {
			uColor: {
				value: new Color('#FFF')
			}
		},
		vertexShader: `
       void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
		fragmentShader: ` 
        uniform vec3 uColor;
        void main() {
          gl_FragColor = vec4(uColor, 1);
        }
      `
	}
	const geometry = new EdgesGeometry(props.builds.geometry)
	const surroundLineMaterial = new ShaderMaterial(shader)
	const line = new LineSegments(geometry, surroundLineMaterial);
	line.name = 'surroundLine';
	// line.applyMatrix4(props.builds.matrix.clone())
	line.material.linewidth = 1000
	props.builds.add(line)
}
</script>

<template>
	<!-- <TresLineSegments>
		<TresEdgesGeometry :geometry="props.builds.geometry" />
		<TresShaderMaterial v-bind="shader" />
	</TresLineSegments> -->
	<!-- <primitive :object="line" /> -->
</template>

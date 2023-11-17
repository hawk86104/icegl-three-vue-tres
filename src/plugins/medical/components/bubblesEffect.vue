<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-17 10:02:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-17 16:25:59
-->
<template>
	<TresPoints ref="TresMeshRef">
		<TresBufferGeometry ref="BufferGeometryRef"></TresBufferGeometry>
		<TresShaderMaterial v-bind="customMaterial"></TresShaderMaterial>
	</TresPoints>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { ref, watchEffect } from 'vue';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import glowVertex from '../shaders/glow.vert?raw';
import glowFrag from '../shaders/glow.frag?raw';
import { useRenderLoop } from '@tresjs/core';

const props = withDefaults(
	defineProps<{
		model: THREE.Group;
		color?: string;
		opacity?: number;
	}>(),
	{
		color: '#FFF',
		opacity: 1.0,
	},
);

const memorySelected = ['afective', 'semantic', 'episodic', 'process', 'amigdala', 'brainstem', 'bridge', 'cerebellum', 'analitic']
const memories = {};
props.model.traverse((child) => {
	if (child instanceof THREE.Mesh) {
		memorySelected.map((m) => {
			if (child.name.includes(m)) {
				if (memories[m]) {
					const tmpGeometry = [memories[m], child.geometry];
					memories[m] = BufferGeometryUtils.mergeGeometries(tmpGeometry);
					return memories;
				}
				return (memories[m] = child.geometry);
			}
			return [];
		});
	}
});
const BufferGeometryRef = ref();
const initBufferGeometry = () => {
	const particles = 20000;
	const sizes = [];
	const positions = [];
	const colors = [] as any;
	const delay = [];
	const duration = 2.5;
	const maxPointDelay = 1.5;
	const bubbles = [];
	for (let i = 0; i < particles - memorySelected.length * 3; i += 1) {
		const r = THREE.MathUtils.randInt(0, memorySelected.length - 1); //Math.floor(Math.random() * memorySelected.length)
		const mSelector = memorySelected[r];
		const x = memories[mSelector].attributes.position.array[i * 3 + 0] || 0;
		const y = memories[mSelector].attributes.position.array[i * 3 + 1] || 0;
		const z = memories[mSelector].attributes.position.array[i * 3 + 2] || 0;
		positions.push(x, y, z);
		sizes[i] = THREE.MathUtils.randFloat(10.0, 20.0);
		if (i % 100 === 0) {
			const altitude = THREE.MathUtils.randInt(100, 250) + y;
			bubbles.push(x, altitude, z, 1.0);
		} else {
			bubbles.push(x, y, z, 0.0);
		}
		delay[i * 2 + 0] = THREE.MathUtils.randFloat(0.5, maxPointDelay);
		delay[i * 2 + 1] = duration;
	}

	BufferGeometryRef.value.setAttribute('aDelayDuration', new THREE.Float32BufferAttribute(delay, 2));
	BufferGeometryRef.value.setAttribute('bubbles', new THREE.Float32BufferAttribute(bubbles, 4));
	BufferGeometryRef.value.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	BufferGeometryRef.value.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	BufferGeometryRef.value.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
	BufferGeometryRef.value.computeBoundingSphere();
};
const customMaterial = new THREE.ShaderMaterial({
	uniforms: {
		glowColor: { type: 'c', value: new THREE.Color(props.color) },
		uTime: { type: 'f', value: 0.0 },
		uSlowTime: { type: 'f', value: 0.0 },
		uBubblesUp: { type: 'f', value: 1.0 },
		uOpacity: { type: 'f', value: props.opacity },
	},
	vertexShader: glowVertex,
	fragmentShader: glowFrag,
	blending: THREE.AdditiveBlending,
	side: THREE.DoubleSide,
	depthTest: false,
	vertexColors: false,
	transparent: true,
});

watchEffect(() => {
	if (BufferGeometryRef.value) {
		initBufferGeometry();
	}
});

const TresMeshRef = ref();
const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
	if (TresMeshRef.value) {
		TresMeshRef.value.material.uniforms.uTime.value += 1 / 20;
		TresMeshRef.value.material.uniforms.uSlowTime.value += 1 / 400;
	}
	if (props.color) {
		customMaterial.uniforms.glowColor.value = new THREE.Color(props.color)
	}
	if (props.opacity) {
		customMaterial.uniforms.uOpacity.value = props.opacity
	}
});
</script>
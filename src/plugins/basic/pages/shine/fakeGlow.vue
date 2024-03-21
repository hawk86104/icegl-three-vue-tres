<template>
	<TresCanvas window-size>
		<TresPerspectiveCamera :position="[0, 25, 25]" :near="0.1" :fov="65" />
		<TresAmbientLight :intensity="1.5" />
		<TresDirectionalLight :position="[100, 100, 60]" :intensity="20" />
		<OrbitControls autoRotate />
		<TresGridHelper :args="[20, 10]" />

		<TresGroup :position="[0, 6, 0]">
			<TresMesh>
				<TresTorusKnotGeometry :args="[4, 0.5, 128, 128]" />
				<TresMeshPhysicalMaterial color="blue" :roughness="0.2" :clearcoat="1" />
			</TresMesh>

			<primitive :object="fakeGlowMesh" />
		</TresGroup>
		<Suspense>
			<Environment preset="city" />
		</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

import { OrbitControls, Environment } from '@tresjs/cientos'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import FakeGlowMaterial from '../../lib/FakeGlowMaterial'

const paneControl = new Pane({
	title: '辉光参数',
	expanded: true
})

const fakeGlowState = reactive({
	glowColor: '#a058c1',
	falloff: 1.4,
	glowInternalRadius: 3.7,
	glowSharpness: 0.0,
	opacity: 1.0,
	side: THREE.FrontSide,
	depthTest: false,
})
const fgMaterial = new FakeGlowMaterial()

// opacity
const fakeGlowMesh = new THREE.Mesh(
	new THREE.TorusKnotGeometry(4, 3.8, 128, 128),
	fgMaterial as any
)
paneControl.addBinding(fakeGlowState, 'glowColor', {
	label: '颜色'
})
paneControl.addBinding(fakeGlowState, 'falloff', {
	label: '衰减', min: 0,
	max: 10,
	step: 0.1,
})
paneControl.addBinding(fakeGlowState, 'glowInternalRadius', {
	label: '内半径', min: -5,
	max: 5,
	step: 0.1,
})
paneControl.addBinding(fakeGlowState, 'glowSharpness', {
	label: '清晰度', min: 0,
	max: 10,
	step: 0.1,
})
paneControl.addBinding(fakeGlowState, 'opacity', {
	label: '透明', min: 0,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(fakeGlowState, 'side', {
	label: '材质面',
	options: {
		FrontSide: THREE.FrontSide,
		BackSide: THREE.BackSide,
		DoubleSide: THREE.DoubleSide,
	},
})
// paneControl.addBlade({
// 	view: 'list',
// 	label: '材质面',
// 	options: [
// 		{ text: 'FrontSide', value: THREE.FrontSide },
// 		{ text: 'BackSide', value: THREE.BackSide },
// 		{ text: 'DoubleSide', value: THREE.DoubleSide },
// 	],
// 	value: THREE.FrontSide,
// })

watchEffect(() => {
	fgMaterial.uniforms.falloff.value = fakeGlowState.falloff
	fgMaterial.uniforms.glowColor.value = new THREE.Color(fakeGlowState.glowColor)
	fgMaterial.uniforms.glowInternalRadius.value = fakeGlowState.glowInternalRadius
	fgMaterial.uniforms.glowSharpness.value = fakeGlowState.glowSharpness
	fgMaterial.uniforms.opacity.value = fakeGlowState.opacity
	fgMaterial.side = fakeGlowState.side
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 09:13:15
-->
<script setup lang="ts">
import { useTexture, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

const props = withDefaults(defineProps<{
	cPosition: Array<number>
}>(), {
	cPosition: [0, 200, 0]
})

const { map: pTexture } = await useTexture({
	map: './plugins/digitalCity/image/cloud.png'
})
pTexture.magFilter = THREE.LinearMipMapLinearFilter
pTexture.minFilter = THREE.LinearMipMapLinearFilter

const particleGroup = new SPE.Group({
	texture: {
		value: pTexture
	},
	blending: THREE.NormalBlending,
	// fog: true,
	depthTest: false,
	depthWrite: false,
})

const emitter = new SPE.Emitter({
	type: SPE.distributions.BOX,
	particleCount: 26,
	maxAge: {
		value: 10,
	},
	position: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3(2000, 100, 2000)
	},
	velocity: {
		value: new THREE.Vector3(0, 0, 30)
	},
	wiggle: {
		spread: 10
	},
	size: {
		value: 520,
		spread: [100, 220],
		randomise: true,
	},
	drag: {
		value: 220,
	},
	opacity: {
		value: [0, 1, 0],
		randomise: true,
	},
	color: {
		value: new THREE.Color(1, 1, 1),
		spread: new THREE.Color(0.1, 0.1, 0.1)
	},
	angle: {
		value: [0, Math.PI * 1 / 8]
	}
});

particleGroup.addEmitter(emitter)
const objCloud = particleGroup.mesh

const { onLoop } = useRenderLoop()
onLoop(({ dt }) => {
	particleGroup.tick(dt)
})
</script>

<template>
	<primitive :object="objCloud" :position="cPosition" :renderOrder="3000" />
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-13 09:39:00
-->
<script setup lang="ts">
import { useTexture, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

const { map: pTexture } = await useTexture({
	map: './plugins/digitalCity/image/smokeparticle.png'
})

const particleGroup = new SPE.Group({
	texture: {
		value: pTexture
	},
	blending: THREE.AdditiveBlending,
	depthTest: true,
	depthWrite: false,
})

const emitter = new SPE.Emitter({
	type: SPE.distributions.SPHERE,
	particleCount: 150,
	maxAge: {
		value: 3,
	},
	position: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3(1, 1, 1),
		radius: 1,
	},
	velocity: {
		value: new THREE.Vector3(0, 20, 0),
		spread: new THREE.Vector3(12, 40, 12),
		distribution: SPE.distributions.BOX,
	},
	size: {
		value: [200, 100, 10],
		// spread: [14, 10, 8],
		// randomise: true,
	},
	// wiggle: {
	// 	spread: 10
	// },
	// drag: {
	// 	value: 10,
	// 	spread: 10,
	// },
	// opacity: {
	// 	value: [0.9, 1.5],
	// 	spread: [1, 0],
	// 	randomise: true,
	// },
	color: {
		value: new THREE.Color('#ff0000'),
		spread: new THREE.Vector3(0.05, 0.05, 0.01)
	}
})

particleGroup.addEmitter(emitter)
const objCloud = particleGroup.mesh

const { onLoop } = useRenderLoop()
onLoop(() => {
	particleGroup.tick()
})
</script>

<template>
	<primitive :object="objCloud" :renderOrder="3001" />
</template>

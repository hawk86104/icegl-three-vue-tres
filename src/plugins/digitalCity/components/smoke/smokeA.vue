<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 09:34:23
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
	blending: THREE.NormalBlending,
	depthTest: true,
	depthWrite: false,
})

const emitter = new SPE.Emitter({
	type: SPE.distributions.BOX,
	particleCount: 100,
	maxAge: {
		value: 4,
	},
	position: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3(2, 0, 2),
		radius: 1,
	},
	velocity: {
		value: new THREE.Vector3(0, 16, 0),
		spread: new THREE.Vector3(12, 40, 12),
		distribution: SPE.distributions.BOX,
	},
	size: {
		value: [200, 100, 100],
		spread: [14, 10, 8],
		randomise: true,
	},
	acceleration: {
		value: new THREE.Vector3(0, 10, 0),
	},
	angle: {
		value: 0,
		spread: 120,
	},
	opacity: {
		value: [0.5, 0.1],
		spread: [0.1, 0],
		randomise: true,
	},
	color: {
		value: new THREE.Color('#333333'),
		// spread: new THREE.Vector3(0.1, 0.1, 0.1)
	}
})

particleGroup.addEmitter(emitter)
const objSmoke = particleGroup.mesh

const { onLoop } = useRenderLoop()
onLoop(({ dt }) => {
	particleGroup.tick(dt)
})
</script>

<template>
	<primitive :object="objSmoke" :position="[-130, 26, 20]" :renderOrder="3000" />
</template>

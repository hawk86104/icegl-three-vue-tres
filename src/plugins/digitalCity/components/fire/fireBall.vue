<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-19 16:44:32
-->
<script setup lang="ts">
import { useTexture, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

const { map: pTexture } = await useTexture({
	map: './plugins/digitalCity/image/sprite-explosion.png'
})

const particleGroup = new SPE.Group({
	texture: {
		value: pTexture,
		frames: new THREE.Vector2(5, 5),
		loop: 1
	},
	depthTest: true,
	depthWrite: false,
	blending: THREE.AdditiveBlending,
	scale: 600
})

const emitter = new SPE.Emitter({
	particleCount: 20,
	type: SPE.distributions.SPHERE,
	position: {
		radius: 1
	},
	maxAge: { value: 2 },
	// duration: 1,
	activeMultiplier: 20,
	velocity: {
		value: new THREE.Vector3(10)
	},
	size: { value: [20, 100] },
	color: {
		value: [
			new THREE.Color(0.5, 0.1, 0.05),
			new THREE.Color(0.2, 0.2, 0.2)
		]
	},
	opacity: { value: [0.5, 0.35, 0.1, 0] }
})


const flash = new SPE.Emitter({
	particleCount: 50,
	position: { spread: new THREE.Vector3(5, 5, 5) },
	velocity: {
		spread: new THREE.Vector3(30),
		distribution: SPE.distributions.SPHERE
	},
	size: { value: [2, 20, 20, 20] },
	maxAge: { value: 2 },
	activeMultiplier: 2000,
	opacity: { value: [0.5, 0.25, 0, 0] }
})
particleGroup.addEmitter(emitter).addEmitter(flash)

const objFireBall = particleGroup.mesh

const { onLoop } = useRenderLoop()
onLoop(({ dt }) => {
	particleGroup.tick()
})
</script>

<template>
	<primitive :object="objFireBall" :position="[-130, 60, 20]" :renderOrder="3000" />
</template>

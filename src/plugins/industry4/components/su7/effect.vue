<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-09 15:38:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-16 09:11:13
-->
<template></template>

<script setup lang="ts">
import { watchEffect, watch } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js"

const props = withDefaults(
	defineProps<{
		hide?: boolean
	}>(),
	{
		hide: false,
	},
)

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	threshold: 0.666,
	strength: 0.166,
	radius: 0.3,
}
let effectComposer = null as any
let bloomPass = null as any
const Effect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	const renderScene = new RenderPass(scene, camera)
	bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	effectComposer = new EffectComposer(renderer)
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)
	effectComposer.addPass(bloomPass)
	// const OP = new OutputPass()
	// effectComposer.addPass(OP)
}
let afterImagePass = null as any
const afterImagePassEffect = (renderer: THREE.WebGLRenderer) => {
	afterImagePass = new AfterimagePass()
	afterImagePass.uniforms['damp'].value = 0.2
	afterImagePass.enabled = false
	effectComposer.addPass(afterImagePass)
}

watchEffect(() => {
	if (sizes.width.value) {
		Effect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
		afterImagePassEffect(renderer.value)
	}
})

watch(
	() => props.hide,
	(newVal) => {
		if (newVal) {
			bloomPass.strength = 0.01
			// bloomPass.threshold = 1
			bloomPass.radius = 10
			afterImagePass.enabled = true
		} else {
			bloomPass.strength = 0.166
			bloomPass.radius = 0.3
			afterImagePass.enabled = false
		}
	}
)

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (effectComposer) {
		effectComposer.render()
	}
})
</script>
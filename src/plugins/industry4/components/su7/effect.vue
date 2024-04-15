<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-09 15:38:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-15 20:59:24
-->
<template></template>

<script setup lang="ts">
import { watchEffect, watch } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

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
	effectComposer.addPass(new OutputPass())
}

watchEffect(() => {
	if (sizes.width.value) {
		Effect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
	}
})

watch(
	() => props.hide,
	(newVal) => {
		if (newVal) {
			bloomPass.enabled = false
		} else {
			bloomPass.enabled = true
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
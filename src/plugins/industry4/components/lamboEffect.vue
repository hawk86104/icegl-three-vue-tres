<template></template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js'
import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js'

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	threshold: 0.666,
	strength: 0.366,    // 强度
	radius: 0.33,       // 半径
}
let effectComposer = null as any
let lutPass = null as any
const Effect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	const renderScene = new RenderPass(scene, camera)
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	effectComposer = new EffectComposer(renderer)
	// effectComposer.renderToScreen = false
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)
	effectComposer.addPass(bloomPass)
	effectComposer.addPass(new OutputPass())

	lutPass = new LUTPass({
		intensity: 1.0,
	})
	effectComposer.addPass(lutPass)
}

new LUTCubeLoader()
	.load('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/F-6800-STD.cube', function (result) {
		lutPass.lut = result.texture3D
	})

watchEffect(() => {
	if (sizes.width.value) {
		Effect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (effectComposer) {
		effectComposer.render()
	}
})
</script>
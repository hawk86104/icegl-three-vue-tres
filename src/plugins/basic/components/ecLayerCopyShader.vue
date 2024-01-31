<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 08:12:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-31 10:34:48
-->
<template>
	<TresMesh ref="normalBox" :position="[3, 2, 1]">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshNormalMaterial />
	</TresMesh>
	<TresMesh ref="shineBox" :position="[0, 2, -4]">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshNormalMaterial />
	</TresMesh>
	<TresMesh ref="filmBox" :position="[1, 2, 3]">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshNormalMaterial />
	</TresMesh>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
const normalBox = ref()
const shineBox = ref()
const filmBox = ref()
watchEffect(() => {
	if (normalBox.value) {
		normalBox.value.layers.set(0)
	}
	if (shineBox.value) {
		shineBox.value.layers.set(1)
	}
	if (filmBox.value) {
		filmBox.value.layers.set(2)
	}
})

import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	strength: 0.572,    // 强度
	radius: 0.51,       // 半径
	threshold: 0,
}
let renderScene = null as any
let effectComposer = null as any
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// 渲染器通道，将场景全部加入渲染器
	renderScene = new RenderPass(scene, camera)

	// const effectCopy = new ShaderPass(CopyShader) //传入了CopyShader着色器，用于拷贝渲染结果
	// effectCopy.renderToScreen = true

	// 添加虚幻发光通道
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	// 创建合成器
	effectComposer = new EffectComposer(renderer)
	// effectComposer.renderToScreen = false
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)
	effectComposer.addPass(bloomPass)
	// effectComposer.addPass(effectCopy)
	effectComposer.render()
}
bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (effectComposer && camera.value) {
		renderer.value.clear()

		camera.value.layers.set(1)
		effectComposer.render()

		renderer.value.clearDepth() // 清除深度缓存

		camera.value.layers.set(0)
		// effectComposer.render()
		renderer.value.render(scene.value, camera.value)

	}
})
</script>
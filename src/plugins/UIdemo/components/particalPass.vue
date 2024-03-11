<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-11 18:15:25
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 18:52:41
-->
<template>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const props = withDefaults(defineProps<{
	use?: boolean
}>(), {
	use: true,
})

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	threshold: 0,
	strength: 0.472,    // 强度
	radius: 1.61,       // 半径
}

let effectComposer = null as any
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// 渲染器通道，将场景全部加入渲染器
	const renderScene = new RenderPass(scene, camera)
	// 添加虚幻发光通道
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	// 创建合成器
	const renderTarget = new THREE.WebGLRenderTarget(
		width,
		height,
		{
			generateMipmaps: false,
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			colorSpace: THREE.SRGBColorSpace,
			samples: 0
		}
	)
	effectComposer = new EffectComposer(renderer, renderTarget)
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)
	effectComposer.addPass(bloomPass)
}

watchEffect(() => {
	if (sizes.width.value) {
		bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (props.use) {
		if (effectComposer) {
			effectComposer.render()
		}
	} else {
		if (renderer.value && camera.value) {
			renderer.value.render(scene.value, camera.value)
		}
	}

})
</script>
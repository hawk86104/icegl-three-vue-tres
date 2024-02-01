<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 17:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-01 17:52:32
-->
<template>
	<Box :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" />
	<!-- <TresMesh :position="[0, 2, -4]">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshNormalMaterial />
	</TresMesh> -->
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { Box } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js"
// import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
// import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js'
// import { ClearPass } from 'three/addons/postprocessing/ClearPass.js'

//清除掩膜通道
const clearMask = new ClearMaskPass()

const { camera, renderer, scene, sizes } = useTresContext()
let effectComposer = null as any
const params = {
	threshold: 0,
	strength: 0.972,    // 强度
	radius: 0.21,       // 半径
}
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// 渲染器通道，将场景全部加入渲染器
	const renderScene = new RenderPass(scene, camera)
	// const clearPass = new ClearPass()
	// effectComposer.addPass(clearPass)
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)

	// 添加虚幻发光通道
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	effectComposer.addPass(bloomPass)
}

// const Tcamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
// Tcamera.position.set(-15, 30, 40) // 设置相机位置
// Tcamera.lookAt(new THREE.Vector3(0, 0, 0))

const MaskPassEffect = (scene2: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	let meshCurve = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
	meshCurve.position.set(0, -2, -4)
	scene2.add(meshCurve)

	var renderPass2 = new RenderPass(scene2, camera)
	renderPass2.clear = false // 是否清除前一帧绘图，默认true
	effectComposer.addPass(renderPass2)

	//创建掩膜通道
	const maskPass = new MaskPass(scene2, camera)
	effectComposer.addPass(maskPass) 	//添加掩膜通道，使后续处理效果只作用于该通道上的物体

	const filmPass = new FilmPass()
	effectComposer.addPass(filmPass)

	effectComposer.addPass(clearMask) // 清除掩膜通道

	//顺序是 +渲染通道[RenderPass] + 掩膜[MaskPass] + 效果[FilmPass] + 清除掩膜[ClearMaskPass]
}

const glitchPassEffect = (scene3: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// scene.value
	const spotLight1 = new THREE.DirectionalLight(0xffffff)
	spotLight1.position.set(550, 100, 550)
	spotLight1.intensity = 1.6
	scene3.add(spotLight1)

	let meshCurve = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
	meshCurve.position.set(1, 2, 4)
	scene3.add(meshCurve)

	var renderPass2 = new RenderPass(scene3, camera)
	renderPass2.clear = false // 是否清除前一帧绘图，默认true
	effectComposer.addPass(renderPass2)

	//创建掩膜通道
	const maskPass = new MaskPass(scene3, camera)
	effectComposer.addPass(maskPass) 	//添加掩膜通道，使后续处理效果只作用于该通道上的物体

	const glitchPass = new GlitchPass()
	effectComposer.addPass(glitchPass)

	// const outputPass = new OutputPass()
	// effectComposer.addPass(outputPass)
	// const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	// effectComposer.addPass(bloomPass)

	effectComposer.addPass(clearMask) // 清除掩膜通道
	//顺序是 +渲染通道[RenderPass] + 掩膜[MaskPass] + 效果[GlitchPass] + 清除掩膜[ClearMaskPass]
}

const endEffectCopy = () => {
	//创建效果复制通道
	const effectCopy = new ShaderPass(CopyShader)
	effectCopy.renderToScreen = true
	effectComposer.addPass(effectCopy) //添加效果复制通道，将最终的结果复制到屏幕
}

watchEffect(() => {
	if (sizes.width.value && !effectComposer) {
		effectComposer = new EffectComposer(renderer.value)
		effectComposer.renderTarget1.stencilBuffer = true
		effectComposer.renderTarget2.stencilBuffer = true

		bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
		// MaskPassEffect(new THREE.Scene(), camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
		glitchPassEffect(new THREE.Scene(), camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
		endEffectCopy()
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (effectComposer) {
		renderer.value.autoClear = false
		effectComposer.render()
	}
})
</script>
<template>
	<Box :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" />
	<!-- <TresMesh :position="[0, 2, -4]">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshNormalMaterial />
	</TresMesh> -->
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { Box } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js"
// import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
// import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	threshold: 0,
	strength: 0.972,    // 强度
	radius: 0.21,       // 半径
}
let effectComposer = null as any
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// 渲染器通道，将场景全部加入渲染器
	const renderScene = new RenderPass(scene, camera)
	// 添加虚幻发光通道
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	// 创建合成器
	effectComposer = new EffectComposer(renderer)
	// 将渲染器和场景结合到合成器中
	effectComposer.addPass(renderScene)
	effectComposer.addPass(bloomPass)
}
bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)

const filmPassEffect = (scene2: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	let meshCurve = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
	meshCurve.position.set(0, 2, -4)
	scene2.add(meshCurve)

	var renderPass2 = new RenderPass(scene2, camera)
	renderPass2.clear = false
	effectComposer.addPass(renderPass2)

	// const glitchPass = new GlitchPass()
	// effectComposer.addPass(glitchPass)

	// const dotScreenPass = new DotScreenPass()
	// effectComposer.addPass(dotScreenPass)

	const filmPass = new FilmPass()
	effectComposer.addPass(filmPass)

	// const outputPass = new OutputPass()
	// effectComposer.addPass(outputPass)
}
filmPassEffect(new THREE.Scene(), camera.value as any, renderer.value, sizes.width.value, sizes.height.value)

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (effectComposer) {
		effectComposer.render()
	}
})
</script>
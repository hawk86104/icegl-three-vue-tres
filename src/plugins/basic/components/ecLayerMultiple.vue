<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 08:12:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-01 18:00:42
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
	<TresMesh ref="glitchSphere" :position="[-3, 2, 0]">
		<TresSphereGeometry :args="[0.8, 32, 16]" />
		<TresMeshNormalMaterial />
	</TresMesh>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
const normalBox = ref()
const shineBox = ref()
const filmBox = ref()
const glitchSphere = ref()
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
	if (glitchSphere.value) {
		glitchSphere.value.layers.set(3)
	}
})

import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
	strength: 0.572,    // 强度
	radius: 0.51,       // 半径
	threshold: 0,
}
let renderScene = null as any
let bloomEffectComposer = null as any
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
	// 渲染器通道，将场景全部加入渲染器
	renderScene = new RenderPass(scene, camera)
	// 创建合成器
	bloomEffectComposer = new EffectComposer(renderer)
	bloomEffectComposer.renderToScreen = false
	// 将渲染器和场景结合到合成器中
	bloomEffectComposer.addPass(renderScene)

	// 添加虚幻发光通道
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
	bloomEffectComposer.addPass(bloomPass)
}

import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
let filmEffectComposer = null as any
const filmPassEffect = (renderer: THREE.WebGLRenderer) => {
	// 创建合成器
	filmEffectComposer = new EffectComposer(renderer)
	filmEffectComposer.renderToScreen = false
	// 将渲染器和场景结合到合成器中
	filmEffectComposer.addPass(renderScene)
	const filmPass = new FilmPass()
	filmEffectComposer.addPass(filmPass)
}

import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js"
let afterImageEffectComposer = null as any
const afterImagePassEffect = (renderer: THREE.WebGLRenderer) => {
	// 创建合成器
	afterImageEffectComposer = new EffectComposer(renderer)
	afterImageEffectComposer.renderToScreen = false
	// 将渲染器和场景结合到合成器中
	afterImageEffectComposer.addPass(renderScene)
	const afterImagePass = new AfterimagePass()
	afterImageEffectComposer.addPass(afterImagePass)
}

// import { SMAAPass } from 'three/addons/postprocessing/SMAAPass' //效果不好
import { FXAAShader } from 'three/addons/shaders/FXAAShader' //效果不错
let finalComposer = null as any
const makeFinalComposer = (renderer: THREE.WebGLRenderer) => {
	finalComposer = new EffectComposer(renderer)
	finalComposer.addPass(renderScene)

	const finalShader = new THREE.ShaderMaterial({
		uniforms: {
			baseTexture: { value: null },
			bloomTexture: { value: bloomEffectComposer.renderTarget2.texture },
			filmTexture: { value: filmEffectComposer.renderTarget2.texture },
			glitchTexture: { value: afterImageEffectComposer.renderTarget2.texture }
		},
		vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
		fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
						uniform sampler2D filmTexture;
						uniform sampler2D glitchTexture;
            varying vec2 vUv;
            void main() {
                gl_FragColor = ( 
									vec4( 1.0 ) * texture2D( baseTexture, vUv )  + 
									vec4( 1.0 ) * texture2D( bloomTexture, vUv ) + 
									vec4( 1.0 ) * texture2D( filmTexture, vUv ) + 
									vec4( 1.0 ) * texture2D( glitchTexture, vUv ) 
								);
            }
        `,
		defines: {}
	})
	const finalPass = new ShaderPass(finalShader, "baseTexture")
	finalPass.needsSwap = true
	finalComposer.addPass(finalPass)

	const { width, height } = renderer.getDrawingBufferSize(new THREE.Vector2())
	// 抗锯齿 效果不好
	// const pixelRatio = renderer.getPixelRatio()
	// const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio)
	// finalComposer.addPass(smaaPass)
	//fxaa抗锯齿 效果不错
	const fxaaPass = new ShaderPass(FXAAShader)
	fxaaPass.uniforms.resolution.value.set(1 / width, 1 / height)
	finalComposer.addPass(fxaaPass)
}

watchEffect(() => {
	if (sizes.width.value) {
		bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
		afterImagePassEffect(renderer.value)
		filmPassEffect(renderer.value)
		makeFinalComposer(renderer.value)
	}
})


const { onLoop } = useRenderLoop()
onLoop(() => {
	if (bloomEffectComposer && finalComposer && camera.value) {
		renderer.value.clear()

		camera.value.layers.set(1)
		bloomEffectComposer.render()

		camera.value.layers.set(2)
		filmEffectComposer.render()

		camera.value.layers.set(3)
		afterImageEffectComposer.render()

		renderer.value.clearDepth() // 清除深度缓存

		camera.value.layers.set(0)
		finalComposer.render(scene.value, camera.value)

	}
})
</script>
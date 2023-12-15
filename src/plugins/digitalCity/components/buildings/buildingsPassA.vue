<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-15 11:01:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-15 17:25:06
-->

<script setup lang="ts">
import * as THREE from 'three'
import { defineProps, watchEffect } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { FXAAShader } from 'three/addons/shaders/FXAAShader'
// import { SMAAPass } from 'three/addons/postprocessing/SMAAPass' // 锯齿修正
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader' //颜色修正

import vertexShader from '../../shaders/buildingsPassA.vert?raw'
import fragmentShader from '../../shaders/buildingsPassA.frag?raw'

const props = withDefaults(
	defineProps<{
		color?: string
		uScalenum?: number
		uScaleone?: number
		uWidth?: number
		speed?: number
		uPosition?: any
	}>(),
	{
		color: '#FFF',
		uScalenum: 150,
		uScaleone: 24,
		uWidth: 1.0,
		speed: 1.0,
		uPosition: { x: 0, y: 0 }
	},
)

const { renderer, scene, camera } = useTresContext()
const { width, height } = renderer.value.getDrawingBufferSize(
	new THREE.Vector2()
)

const effectComposer = new EffectComposer(renderer.value)
const depthTexture = new THREE.DepthTexture(width, height)
effectComposer.readBuffer.depthBuffer = true
effectComposer.readBuffer.depthTexture = depthTexture

const renderPass = new RenderPass(scene.value, camera.value)
effectComposer.addPass(renderPass)

const shaderPass = new ShaderPass(
	new THREE.ShaderMaterial({
		uniforms: {
			time: { value: 0 },
			tDiffuse: { value: null },
			depthTexture: { value: depthTexture },
			uProjectionInverse: {
				value: camera.value.projectionMatrixInverse,
			},
			uMatrixWorld: { value: camera.value.matrixWorld },
			uColor: {
				value: new THREE.Color(props.color)
			},
			uScalenum: { value: props.uScalenum },
			uScaleone: { value: props.uScaleone },
			uWidth: { value: props.uWidth },
			uPosition: { value: new THREE.Vector2(props.uPosition.x, props.uPosition.y) },
		},
		vertexShader,
		fragmentShader,
	})
)
effectComposer.addPass(shaderPass)

//修正颜色
const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionShader)

// 两种抗锯齿的方法 都闪烁
//SMAAPass 抗锯齿 
// const pixelRatio = renderer.value.getPixelRatio()
// const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio)
// effectComposer.addPass(smaaPass)

//fxaa抗锯齿
// const fxaaPass = new ShaderPass(FXAAShader)
// fxaaPass.uniforms.resolution.value.set(1 / width, 1 / height)
// effectComposer.addPass(fxaaPass)

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
	effectComposer.render();
	shaderPass.uniforms.time.value += props.speed / 60;
})

watchEffect(() => {
	if (props.color) {
		shaderPass.material.uniforms.uColor.value = new THREE.Color(props.color)
	}
	if (props.uScalenum) {
		shaderPass.material.uniforms.uScalenum.value = props.uScalenum
	}
	if (props.uScaleone) {
		shaderPass.material.uniforms.uScaleone.value = props.uScaleone
	}
	if (props.uWidth) {
		shaderPass.material.uniforms.uWidth.value = props.uWidth
	}
	if (props.uPosition) {
		shaderPass.material.uniforms.uPosition.value.set(props.uPosition.x, props.uPosition.y)
	}
})
</script>

<template></template>
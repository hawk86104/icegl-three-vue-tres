<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 10:52:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-29 16:43:33
-->

<script setup lang="ts">
import * as THREE from "three"
import { useTexture, useTresContext, useRenderLoop } from '@tresjs/core'
import { useGLTF } from "@tresjs/cientos"
import SSRTGlassVertex from '../shaders/SSRTGlass.vert?raw'
import SSRTGlassFrag from '../shaders/SSRTGlass.frag?raw'
import { DoubleDepthBuffer } from '../common/doubleDepthBuffer.js'

const props = withDefaults(defineProps<{
	skyBoxTexture: string
	modelPath: string
	modelName: string
}>(), {
})

const { map: pTexture } = await useTexture({ map: props.skyBoxTexture })
pTexture.wrapS = THREE.ClampToEdgeWrapping
pTexture.wrapT = THREE.ClampToEdgeWrapping
pTexture.magFilter = THREE.LinearMipmapLinearFilter
pTexture.minFilter = THREE.LinearMipmapLinearFilter

const { camera, renderer, scene } = useTresContext()

const GlassMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uSkybox: { type: "t", value: pTexture },
		uBackFaceBuffer: { type: "t", value: null },
		uFrontFaceBuffer: { type: "t", value: null },
		uCameraFarInverse: { value: 1 / camera.value.far },

		uScreenSizeInv: { value: new THREE.Vector2(1 / window.innerWidth, 1 / window.innerHeight) },
		uCameraPos: { value: new THREE.Vector3(0, 0, 0) },

		uTime: { value: 0 },

		uExtintionColor1: { value: new THREE.Vector3(1 - 192 / 255, 1 - 123 / 255, 1 - 25 / 255) },
		uExtintionColor2: { value: new THREE.Vector3(0.9, 0.35, 0.25) },
		uExtintionFactor: { value: 5 },
		uExposure: { value: 0 },
		uReflectionFactor: { value: 1 },
		uExtinctionFX1: { value: new THREE.Vector4(0, 0, 0, 1) },
	},
	vertexShader: SSRTGlassVertex,
	fragmentShader: SSRTGlassFrag,
})

const { nodes } = await useGLTF(props.modelPath, { draco: true, decoderPath: './draco/' })

const getMesh = nodes.Scene.getObjectByName(props.modelName)

const ddbProgram = new DoubleDepthBuffer(getMesh, camera.value, renderer.value)

const showMesh = getMesh?.clone()
showMesh.traverse((child) => {
	if (child instanceof THREE.Mesh) {
		child.material = GlassMaterial
		child.material.side = THREE.FrontSide
	}
})

const { onAfterLoop } = useRenderLoop()
onAfterLoop(({ elapsed }) => {
	if (getMesh && GlassMaterial) {
		GlassMaterial.uniforms.uCameraPos.value = camera.value.position.clone()
		GlassMaterial.uniforms.uTime.value = elapsed

		ddbProgram.compute(6)
		GlassMaterial.uniforms.uBackFaceBuffer.value = ddbProgram.getBackFaceTexture()
		GlassMaterial.uniforms.uFrontFaceBuffer.value = ddbProgram.getFrontFaceTexture()

		renderer.value.setRenderTarget(null)
		renderer.value.autoClear = false
		// renderer.value.render(scene.value, camera.value)
		// renderer.value.autoClear = true
		// renderer.value.setRenderTarget(null)
	}
})
</script>

<template>
	<primitive :object="showMesh" />
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-01 09:57:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:48:35
-->
<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { AdditiveBlending, DoubleSide, Fog, Color } from 'three';

const gl = {
	clearColor: '#000000',
	alpha: true,
	useLegacyLights: true,
	antialias: true,	//开启锯齿
	logarithmicDepthBuffer: true,
	precision: "highp",
	premultipliedAlpha: false
}

const pTexture = (await useTexture({ map: './plugins/earthSample/image/menuA/quan_01.png' })) as { map: Texture }
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	if (quanMeshRef.value) {
		quanMeshRef.value.rotation.z -= .005
	}
})
const TresCanvasRef = ref()
const quanMeshRef = ref()
watchEffect(() => {
	if (TresCanvasRef.value && TresCanvasRef.value.context) {
		TresCanvasRef.value.context.renderer.value.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		TresCanvasRef.value.context.renderer.value.autoClear = true;
		TresCanvasRef.value.context.renderer.value.autoClearColor = new Color(1, 0, 0, 0);
		TresCanvasRef.value.context.renderer.value.setClearColor(0x000000, 0.0);

		const scene = TresCanvasRef.value.context.scene.value
		const camera = TresCanvasRef.value.context.camera.value
		scene.fog = new Fog(0xfff, 100, 1000);
	}
	if (quanMeshRef.value) {
		// quanMeshRef.value.material.emissive = new Color(0xffffff);
		// quanMeshRef.value.material.emissiveIntensity = 2;
	}
})
</script>

<template>
	<div class="position-absolute w-full h-full">
		<TresCanvas class="TresCanvasNoPointerEvents" ref="TresCanvasRef" v-bind="gl">
			<TresPerspectiveCamera :position="[0, 100, 420]" :fov="50" :aspect="1" :near="1" :far="10000" />
			<OrbitControls :autoRotate="false" />
			<TresMesh ref="quanMeshRef" :position="[0, 0, 0]" :rotation-x="2 * Math.PI / 360 * 100">
				<TresPlaneGeometry :args="[400, 400]" />
				<TresMeshBasicMaterial color="#ffffff" :map="pTexture.map" :alphaMap="pTexture.map" :blending="AdditiveBlending"
					:side="DoubleSide" :depthTest="0.2" :opacity="1" :depthWrite="false" :transparent="true" :alphaTest="0.0" />
			</TresMesh>
		</TresCanvas>
	</div>
</template>

<style scoped>
.TresCanvasNoPointerEvents {
	pointer-events: none !important;
}
</style>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 10:23:58
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-02 12:04:27
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core';
import * as THREE from 'three'

const gl = {
	clearColor: '#000000',
	alpha: true,
	useLegacyLights: true,
	antialias: true,
}
const TresCanvasRef = ref()
let camera, scene = null
watchEffect(() => {
	if (TresCanvasRef.value) {
		TresCanvasRef.value.context.renderer.value.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		TresCanvasRef.value.context.renderer.value.autoClear = false;
		TresCanvasRef.value.context.renderer.value.setClearColor(0x000000, 0.0);


		scene = TresCanvasRef.value.context.scene.value
		camera = TresCanvasRef.value.context.camera.value
		scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);
		camera.position.z = 800 / 2
	}
})

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let mouseX = 0
let mouseY = 0
function onMouseMove(e) {
	mouseX = e.clientX - windowHalfX;
	mouseY = e.clientY - windowHalfY;
}
document.addEventListener('mousemove', onMouseMove, false);

const positionArray = new Float32Array(45000 * 3)
for (let i = 0; i < 45000; i++) {
	positionArray[i * 3 + 0] = Math.random() * 2000 - 1000;
	positionArray[i * 3 + 1] = Math.random() * 2000 - 1000;
	positionArray[i * 3 + 2] = Math.random() * 2000 - 1000;
}

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (camera) {
		camera.position.x += (mouseX - camera.position.x) * 0.005;
		camera.position.y += (-mouseY - camera.position.y) * 0.005;
		camera.lookAt(scene.position);
	}
})
</script>

<template>
	<TresCanvas ref="TresCanvasRef" v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[0, 50, 300]" :fov="40" :far="800" :plane="1" />
		<TresPoints>
			<TresBufferGeometry :args="[1000, 100, 50]" :position="[positionArray, 3]" />
			<TresPointsMaterial color="#66ffff" :size="1.1" :transparency="true" :opacity="0.8" />
		</TresPoints>
	</TresCanvas>
</template>

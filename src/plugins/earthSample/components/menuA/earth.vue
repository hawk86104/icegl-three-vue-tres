<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 16:25:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-02 18:03:57
-->
<script setup>
import { watchEffect, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Fog, Color } from 'three';
import { initCountryPosition } from '../../common/makeList'

const gl = {
	clearColor: '#000000',
	alpha: true,
	useLegacyLights: true,
	antialias: true,	//开启锯齿
	logarithmicDepthBuffer: true,
}
const TresCanvasRef = ref()
watchEffect(() => {
	if (TresCanvasRef.value && TresCanvasRef.value.context) {
		TresCanvasRef.value.context.renderer.value.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		TresCanvasRef.value.context.renderer.value.autoClear = false;
		TresCanvasRef.value.context.renderer.value.autoClearColor = new Color(1, 0, 0, 0);

		const scene = TresCanvasRef.value.context.scene.value

		scene.fog = new Fog(0xfff, 100, 1000);
		initCountryPosition(scene)
	}
})

</script>

<template>
	<div class="w-100 h-100">
		<TresCanvas ref="TresCanvasRef" v-bind="gl">
			<TresPerspectiveCamera :position="[0, 0, 365]" :fov="45" :near="1" :far="10000" />
			<OrbitControls :autoRotate="false" :autoRotateSpeed="2" />
			<!-- <TresMesh :position="[0, 0, 0]">
				<TresSphereGeometry :args="[150, 20, 20]" />
				<TresMeshBasicMaterial color="#03d9de" :wireframe="true" :opacity="0.8" />
			</TresMesh> -->
			<!-- <TresMesh>
				<TresSphereGeometry :args="[53, 32, 32]" />
				<TresMeshBasicMaterial :map="pTexture[1]" :alphaMap="pTexture[1]" :blending="AdditiveBlending"
					:transparent="true" />
			</TresMesh>
			<TresSprite :scale="[155, 155, 0]">
				<TresSpriteMaterial color="#4d76cf" :map="pTexture[2]" :blending="AdditiveBlending" :depthWrite="false"
					:depthTest="false" :transparent="true" />
			</TresSprite>
			<TresSprite :scale="[128, 128, 0]">
				<TresSpriteMaterial color="#4d76cf" :map="pTexture[3]" :blending="AdditiveBlending" :depthWrite="false"
					:depthTest="false" :transparent="true" />
			</TresSprite> -->
		</TresCanvas>
	</div>
</template>

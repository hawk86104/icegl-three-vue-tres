<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-01 09:57:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-01 09:57:32
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { AdditiveBlending, DoubleSide } from 'three';

const pTexture = await useTexture(
	['./plugins/earthSample/image/earthA/moon.jpg', './plugins/earthSample/image/earthA/moon_ring.png']
)

const { onLoop } = useRenderLoop()
const moonRef = ref(null)
onLoop(({ elapsed }) => {
	if (moonRef) {
		const tempelapsed = elapsed / 20
		moonRef.value.position.x = 150 * Math.cos(tempelapsed * Math.PI * 2);
		moonRef.value.position.z = 150 * Math.sin(tempelapsed * Math.PI * 2);
		moonRef.value.rotation.set(0, tempelapsed * Math.PI * 8, 0)
	}
})

</script>

<template>
	<TresMesh ref="moonRef" :position="[150, 0, 0]" :rotation-x="-Math.PI / 2">
		<TresSphereGeometry :args="[5, 32, 32]" />
		<TresMeshStandardMaterial :map="pTexture[0]" emissive="#ffffff" :emissiveMap="pTexture[0]" />
	</TresMesh>
	<TresMesh :rotation-x="-Math.PI / 2">
		<TresRingGeometry :args="[145, 155, 64]" />
		<TresMeshBasicMaterial :map="pTexture[1]" :blending="AdditiveBlending" :side="DoubleSide" :depthWrite="false"
			:transparent="true" :opacity="0.5" />
	</TresMesh>
</template>

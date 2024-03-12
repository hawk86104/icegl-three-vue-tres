<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-01 09:57:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 15:44:53
-->
<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { AdditiveBlending } from 'three';

const pTexture = await useTexture(
	['./plugins/earthSample/image/earthA/map.jpg', './plugins/earthSample/image/earthA/earth.jpg', './plugins/earthSample/image/earthA/glow.png', './plugins/earthSample/image/earthA/innerGlow.png']
)

</script>

<template>
	<TresMesh :position="[0, 0, 0]">
		<TresSphereGeometry :args="[50, 32, 32]" />
		<TresMeshBasicMaterial :map="pTexture[0]" />
	</TresMesh>
	<TresMesh>
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
	</TresSprite>
</template>

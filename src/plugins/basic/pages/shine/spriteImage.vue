<!--
 * @Description: 此方法的缺陷是 Mesh移动到摄像头偏远处 物体产生变形，而本身精灵不会。 解决方法 Mesh也换成 Sprite 后 用shader画圆可解决
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-12 11:41:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-20 09:22:20
-->
<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[3, 3, 3]" />
		<TresAmbientLight :intensity="1" />
		<OrbitControls />
		<TresGridHelper :args="[10, 10]" />

		<TresMesh :position="[0, 1, 0]" :scale="typeState.scale">
			<TresSphereGeometry :args="[0.3, 32, 16]" />
			<TresMeshLambertMaterial :color="typeState.color" />
		</TresMesh>
		<TresSprite :position="[0, 1, 0]" :scale="[typeState.scale, typeState.scale, 1.0]">
			<SpriteMaterial :color="typeState.color" :blending="AdditiveBlending" :map="pTexture" />
		</TresSprite>
	</TresCanvas>
</template>

<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { AdditiveBlending } from 'three'
import { reactive } from 'vue';
import { Pane } from 'tweakpane';
const gl = {
	clearColor: '#222',
}
const typeState = reactive({
	color: "#ffff00",
	scale: 1,
})
const { map: pTexture } = await useTexture({ map: './plugins/basic/shine/image/round.png' })

const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(typeState, 'color', {
	label: '颜色'
})
paneControl.addBinding(typeState, 'scale', {
	label: '大小', min: 1,
	max: 10,
	step: 1,
})
paneControl.addBlade({
	view: 'text',
	label: '问题',
	parse: (v) => String(v),
	value: 'Mesh移动到摄像头偏远处 物体产生变形，而本身精灵不会。 解决方法 Mesh也换成 Sprite 后 用shader画圆可解决',
});
</script>
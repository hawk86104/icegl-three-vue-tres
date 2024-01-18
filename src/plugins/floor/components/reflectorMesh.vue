<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-21 17:05:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-05 16:01:48
-->
<template>
	<TresGroup>
		<primitive :object="mirror" :rotation-x="-Math.PI / 2" :position-y="-0.0001" />
		<primitive :object="gridHelp" />
	</TresGroup>
	<!-- <TresGridHelper ref="rghRef" size="1000" divisions="10000" /> -->
</template>

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { Color, PlaneGeometry, GridHelper } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { watchEffect } from 'vue'
const srcSize = 10

const props = withDefaults(defineProps<{
	mirrorSize?: Number
	gridSize?: Number
	mirrorColor?: String
	divisions?: Number //坐标格细分次数. 默认为 10.
	colorCenterLine?: String //中线颜色
	colorGrid?: String //坐标格网格线颜色
}>(), {
	mirrorSize: 10,
	gridSize: 10,
	mirrorColor: '#ffffff',
	divisions: 10,
	colorCenterLine: "#444444",
	colorGrid: "#888888"
})

const { sizes } = useTresContext()

const mirrorConfig = {
	clipBias: 0.1,//剪裁偏移值，用于控制剪裁平面的位置，可以用于解决渲染的反射对象和原始对象之间的闪烁问题，默认值是 0。
	//shader: 用于渲染反射效果的着色器程序，可以是一个 three.js 的 ShaderMaterial 对象，默认值是 undefined，表示使用内置的着色器。
	//encoding: 反射纹理的编码格式，默认值是 LinearEncoding。
	textureWidth: sizes.width.value * window.devicePixelRatio, //反射纹理的宽度，单位是像素，默认值是 512。
	textureHeight: sizes.height.value * window.devicePixelRatio, //反射纹理的高度，单位是像素，默认值是 512。
	multisample: 0, //反射纹理的多重采样级别，用于抗锯齿，默认值是 0，表示不使用多重采样。
	color: new Color(props.mirrorColor), //color: 反射面的颜色，可以是一个 CSS 颜色字符串或是一个 three.js 的 Color 对象，默认值是 0x7F7F7F。
}
const mirror = new Reflector(new PlaneGeometry(srcSize, srcSize), mirrorConfig)
// mirror.receiveShadow = true
const gridHelp = new GridHelper(srcSize, props.divisions, props.colorCenterLine, props.colorGrid);
watchEffect(() => {
	if (props.mirrorColor) {
		mirror.material.uniforms.color.value = new Color(props.mirrorColor)
	}
	if (props.mirrorSize) {
		mirror.scale.set(props.mirrorSize / srcSize, props.mirrorSize / srcSize, 1)
	}
	if (props.gridSize) {
		if (gridHelp) {
			gridHelp.scale.set(props.gridSize / srcSize, props.gridSize / srcSize, props.gridSize / srcSize)
		}
	}

})
</script>
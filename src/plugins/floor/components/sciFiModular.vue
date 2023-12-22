<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:08:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-21 17:49:20

 Sketchfab_model 
 Cube001__0 Cube009__0  Cube013__0 Cube014__0 Cube015__0 Cube016__0
-->
<template>
	<TresGroup :scale="props.scale" :position="props.position">
		<primitive :object="ob" :rotation-y="-Math.PI / 2" />
		<!-- <primitive :object="ob" :rotation-x="-Math.PI / 2" />
		<primitive :object="ob.clone()" :rotation-x="-Math.PI / 2" :rotation-z="-Math.PI / 2" />
		<primitive :object="ob.clone()" :rotation-x="-Math.PI / 2" :rotation-z="Math.PI / 2" />
		<primitive :object="ob.clone()" :rotation-x="-Math.PI / 2" :rotation-z="-Math.PI" /> -->
	</TresGroup>
</template>

<script lang="ts" setup>
import { useGLTF } from '@tresjs/cientos'
// import { useRenderLoop } from '@tresjs/core'

import { Reflector } from 'three/examples/jsm/objects/Reflector'


const props = withDefaults(
	defineProps<{
		position?: Array<number>
		scale?: Array<number>
	}>(),
	{
		position: [0, -1, 0],
		scale: [1, 1, 1],
	},
)

const { nodes } = await useGLTF(
	// './plugins/floor/model/modular_sci-fi_floor/scene.gltf',
	'./plugins/floor/model/reflection_mirror.glb',
	{ draco: true })
console.log(nodes)
debugger
const geometry = nodes.Object_4.geometry.applyMatrix4(nodes.GLTF_SceneRootNode.matrix)
const ob = new Reflector(geometry, {
	clipBias: 0.1,//剪裁偏移值，用于控制剪裁平面的位置，可以用于解决渲染的反射对象和原始对象之间的闪烁问题，默认值是 0。
	//shader: 用于渲染反射效果的着色器程序，可以是一个 three.js 的 ShaderMaterial 对象，默认值是 undefined，表示使用内置的着色器。
	//encoding: 反射纹理的编码格式，默认值是 LinearEncoding。
	multisample: 0, //反射纹理的多重采样级别，用于抗锯齿，默认值是 0，表示不使用多重采样。
	// textureWidth: window.innerWidth * window.devicePixelRatio, //反射纹理的宽度，单位是像素，默认值是 512。
	// textureHeight: window.innerHeight * window.devicePixelRatio, //反射纹理的高度，单位是像素，默认值是 512。
	// color: new Color(0xffffff), //olor: 反射面的颜色，可以是一个 CSS 颜色字符串或是一个 three.js 的 Color 对象，默认值是 0x7F7F7F。
	color: 0x7F7F7F,
});

// const ob = nodes.Object_4


debugger
// nodes.Cube016__0.material.roughness = 0
// nodes.Cube016__0.material.metalness = 0

// const { onLoop } = useRenderLoop()
// onLoop(() => {
// 	console.log(nodes)
// })
</script>
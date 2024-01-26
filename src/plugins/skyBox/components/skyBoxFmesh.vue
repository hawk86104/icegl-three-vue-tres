<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:23:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-26 16:13:06
-->

<template></template>

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js'

const props = withDefaults(defineProps<{
	texture: string
}>(), {
})
const { scene } = useTresContext()

const loader = new HDRCubeTextureLoader()
const texture = loader.setPath(props.texture).load([
	'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'
]);
//该纹理贴图将会被设为场景中所有物理材质的环境贴图。 然而，该属性不能够覆盖已存在的、已分配给 MeshStandardMaterial.envMap 的贴图。默认为null。
scene.value.environment = texture

//在渲染场景的时候将设置背景，且背景总是首先被渲染的。 可以设置一个用于的“clear”的Color（颜色）、一个覆盖canvas的Texture（纹理）， 或是 a cubemap as a CubeTexture or an equirectangular as a Texture。
scene.value.background = texture

</script>
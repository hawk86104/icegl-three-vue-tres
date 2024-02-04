<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-04 15:40:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-04 16:13:37
-->

<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos"
import { FrontSide } from 'three'

const { nodes } = await useGLTF('./plugins/eCommerce/model/box.glb')
const showModel = nodes.Sketchfab_model.getObjectByName('Cube004__0')

showModel.renderOrder = 1
showModel.material.depthTest = true
showModel.material.side = FrontSide

</script>

<template>
	<primitive :position="[0, 0, 0]" :object="showModel?.clone()" :scale="0.5">
	</primitive>
</template>

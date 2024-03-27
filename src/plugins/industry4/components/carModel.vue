<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-27 10:38:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-27 21:59:23
-->
<template>
	<primitive :object="scene" />
</template>

<script setup>
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
// import { loadHDR } from 'PLS/skyBox/common/utils'

const { scene, nodes, materials } = await useGLTF(
	'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/911-transformed.glb',
	{ draco: true, decoderPath: './draco/' })
Object.values(nodes).forEach((node) => {
	if (node.isMesh) {
		node.receiveShadow = node.castShadow = true
	}
})
materials.rubber.color = new THREE.Color('#222')
materials.rubber.roughness = 0.6
materials.rubber.roughnessMap = null
materials.rubber.normalScale = [4, 4]

materials.window.color = new THREE.Color('black')
materials.window.roughness = 0
materials.window.clearcoat = 0.1

materials.coat.envMapIntensity = 4
materials.coat.roughness = 0.5
materials.coat.metalness = 1

materials.paint.envMapIntensity = 2
materials.paint.roughness = 0.45
materials.paint.metalness = 0.8
materials.paint.color = new THREE.Color('#555')

// const pTexture = await loadHDR("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr")
// Object.values(materials).forEach((ma) => {
// 	console.log(ma)
// 	ma.envMap = pTexture
// })
</script>
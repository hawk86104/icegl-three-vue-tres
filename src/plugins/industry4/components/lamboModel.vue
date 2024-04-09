<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-09 14:36:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-09 15:08:27
-->
<template>
	<TresGroup ref="contactShadowsRef">
		<primitive :object="scene" :scale="0.015" :rotation="[0, Math.PI / 1.5, 0]" />
	</TresGroup>
</template>
<script setup>
import { useGLTF } from '@tresjs/cientos' //ContactShadows
import * as THREE from 'three'

const { scene, nodes, materials } = await useGLTF(
	'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb',
	{ draco: true, decoderPath: './draco/' })
Object.values(nodes).forEach((node) => {
	if (node.isMesh) {
		if (node.name.startsWith('glass')) node.geometry.computeVertexNormals()
		if (node.name === 'silver_001_BreakDiscs_0') {
			node.material = materials.BreakDiscs.clone()
			node.material.color = new THREE.Color('#ddd')
		}
	}
})

nodes.glass_003.scale.setScalar(2.7)
materials.FrameBlack.color = new THREE.Color('black')
materials.FrameBlack.roughness = 0
materials.FrameBlack.metalness = 0.75

materials.Chrome.color = new THREE.Color('#333')
materials.Chrome.metalness = 1
materials.Chrome.roughness = 0

materials.BreakDiscs.color = new THREE.Color('#555')
materials.BreakDiscs.metalness = 0.2
materials.BreakDiscs.roughness = 0.2

materials.TiresGum.color = new THREE.Color('#181818')
materials.TiresGum.metalness = 0
materials.TiresGum.roughness = 0.4

materials.GreyElements.color = new THREE.Color('#292929')
materials.GreyElements.metalness = 0

nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
	roughness: 0.3,
	metalness: 0.05,
	color: '#111',
	envMapIntensity: 0.75,
	clearcoatRoughness: 0,
	clearcoat: 1
})

</script>
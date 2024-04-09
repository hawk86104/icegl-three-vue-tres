<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-27 10:38:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-09 11:19:15
-->
<template>
	<TresGroup ref="contactShadowsRef">
		<primitive :object="scene" :scale="1.6" :position="[-0.5, -0.18, 0]" :rotation="[0, Math.PI / 5, 0]" />
		<!-- <ContactShadows :resolution="80" :opacity="1.0" :blur="1" :position="[0, -1.2, 0]" :frames="10" :scale="1" :far="1"
			:width="10" :height="10" /> -->
	</TresGroup>
</template>

<script setup>
import { useGLTF } from '@tresjs/cientos' //ContactShadows
import * as THREE from 'three'
// import { shallowRef, watch } from 'vue'

// const contactShadowsRef = shallowRef(null)
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
// materials.paint.reflectivity = 1
// materials.paint.diffuse = new THREE.Color(0xffffff)
// materials.paint.specular = new THREE.Color(0xffffff)

// const pTexture = await loadHDR("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr")
// Object.values(materials).forEach((ma) => {
// 	console.log(ma)
// 	ma.envMap = pTexture
// })


// watch(() => contactShadowsRef.value, (value) => {
// 	debugger
// 	value.children[1].children[0].visable = false
// 	value.children[1].children[1].visable = false
// }, {
// 	deep: true
// })
</script>
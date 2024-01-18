
<template>
	<primitive :object="nodes.Sketchfab_model" />
	<cloudPoints isRemoveSrc :model="cubeCSBlack" color="#fff" />
</template>

<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { Plane, Vector3 } from 'three'
import cloudPoints from 'PLS/medical/components/cloudPoints.vue'
import { Pane } from 'tweakpane'


const { renderer } = useTresContext()
renderer.value.localClippingEnabled = true

const { nodes } = await useGLTF(
	'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/plane/scene.gltf', { draco: true, decoderPath: './draco/' })

console.log(nodes)
//移除地板
const floor = nodes.Sketchfab_model.getObjectByName('Floor')
floor.removeFromParent()
//增加阴影产生
const cubeAvion = nodes.Sketchfab_model.getObjectByName('Cube006_Avion_0')
cubeAvion.castShadow = true

//新建三个切面
const clipPlanes = [
	new Plane(new Vector3(1, 0, 0), 0),
	new Plane(new Vector3(0, 0, - 1), 0)
]

cubeAvion.material.clipIntersection = true
cubeAvion.material.clippingPlanes = clipPlanes
const cubeMoteur = nodes.Sketchfab_model.getObjectByName('Cube006_M_Moteur_0')
cubeMoteur.material.clipIntersection = true
cubeMoteur.material.clippingPlanes = clipPlanes

//CS_Black_0 更改为点云
const cubeCSBlack = nodes.Sketchfab_model.getObjectByName('CS_Black_0')
const paneControl = new Pane({
	title: '裁剪参数',
	expanded: true,
})
paneControl.addBinding(clipPlanes[0], 'constant', {
	label: 'x',
	min: -200,
	max: 200,
	step: 1,
})
paneControl.addBinding(clipPlanes[1], 'constant', {
	label: 'y',
	min: -200,
	max: 250,
	step: 1,
})
</script>
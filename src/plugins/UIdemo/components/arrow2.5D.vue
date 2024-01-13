<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-13 19:33:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-13 21:35:48
-->
<template>
	<TresGroup :position="props.position" :scale="props.scale" :rotation="props.rotation">
		<primitive :object="nodes.RootNode" :position-z="props.zRoom" :rotation-z="rotationZnum" />
		<primitive :object="nodes.RootNode.clone()" :position-z="-props.zRoom" :rotation-y="-Math.PI"
			:rotation-z="rotationZnum" />

		<Suspense>
			<Text3D :text="props.text" :position="[0, 0.2, 0]" v-bind="t3dConfig" cast-shadow :rotation="props.textRotation"
				font="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/fonts/FZLanTingHeiS-UL-GB_Regular.json" center>
				<TresMeshStandardMaterial :color="props.color" :emissive="props.color" />
			</Text3D>
		</Suspense>
	</TresGroup>
</template>

<script setup lang="ts">
import { useGLTF, Text3D } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { Color } from 'three'
import { ref } from 'vue'
const props = withDefaults(
	defineProps<{
		position?: Array<number>
		rotation?: Array<number>
		textRotation?: Array<number>
		scale?: number
		text?: string
		zRoom?: number
		arrScale?: Array<number>
		color?: string
	}>(),
	{
		position: [0, 0, 0],
		rotation: [0, 0, 0],
		textRotation: [0, 0, 0],
		scale: 10,
		text: '文本',
		zRoom: 5,
		arrScale: [2, 2, 0.8],
		color: '#9a7a4d'
	},
)


const { nodes } = await useGLTF('./plugins/UIdemo/model/arrowWhite2.5d.glb')

console.log(nodes.RootNode)
nodes.RootNode.scale.set(props.arrScale[0], props.arrScale[1], props.arrScale[2])	//缩放

nodes.RootNode.children[0].children[0].material.color = new Color(props.color)
nodes.RootNode.children[0].children[0].material.emissive = new Color(props.color)
nodes.RootNode.children[0].children[0].castShadow = true
nodes.RootNode.children[0].children[0].roughness = 0

nodes.RootNode.children[1].children[0].material.color = new Color(props.color)
nodes.RootNode.children[1].children[0].material.emissive = new Color(props.color)
nodes.RootNode.children[1].children[0].castShadow = true
nodes.RootNode.children[1].children[0].roughness = 0

//关于字体的设置，请自行更改
const t3dConfig = {
	size: 0.7,
	height: 0.1,
	curveSegments: 5,
	bevelEnabled: true,
	bevelThickness: 0.05,
	bevelSize: 0.006,
	bevelOffset: 0.02,
	bevelSegments: 4,
}

let rotationZnum = ref(0)
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	rotationZnum.value += delta * 2
})

</script>
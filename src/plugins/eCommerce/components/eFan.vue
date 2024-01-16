<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 09:39:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-16 10:56:12
-->
<script setup lang="ts">
import { watch } from "vue"
import { Levioso, ContactShadows, useGLTF, useAnimations } from "@tresjs/cientos"
import svgCom from "../components/svg.vue"
const props = defineProps({
	color: {
		type: String,
		required: true,
	},
})

const { nodes, materials, animations } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/eFan/scene.gltf')

const { actions, mixer } = useAnimations(animations, nodes.Sketchfab_model)
let currentAction = actions.Animation
currentAction.play()

watch(
	() => props.color,
	(color) => {
		// materials.Base.color.set(color)

		// if (color === '#000000') {
		// 	materials.Base.roughness = 1
		// 	materials.Cush.color.set('#050505')
		// }
		// else {
		// 	materials.Cush.color.set('#A4BCB7')
		// }
	},
	{ immediate: true },
)
</script>

<template>
	<Levioso :range="[-0.5, -0.5]" :speed="2">
		<primitive :position="[-2, 0, 0]" :object="nodes.Sketchfab_model" :scale="3.0">
			<svgCom />
		</primitive>
	</Levioso>
	<ContactShadows :opacity="0.3" :blur="2.6" :position="[0, -2, 0]" />
</template>

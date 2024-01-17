<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 09:39:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-17 09:56:24
-->
<script setup lang="ts">
import { watch, ref, provide } from "vue"
import { Levioso, ContactShadows, useGLTF, useAnimations } from "@tresjs/cientos"
import svgCom from "../components/svg.vue"
const props = defineProps({
	color: {
		type: String,
		required: true,
	},
})

const { nodes, materials, animations } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/eFan/nFan.gltf')

const modelAttUVarr = (name) => { return nodes.Sketchfab_model.getObjectByName(name).geometry.attributes.uv.array }
//备份原始UV值
const srcUVslist = {
	'Object_4': new Float32Array(modelAttUVarr('Object_4')),
	'Object_8': new Float32Array(modelAttUVarr('Object_8')),
	'Object_6': new Float32Array(modelAttUVarr('Object_6')),
	'Object_6001': new Float32Array(modelAttUVarr('Object_6001'))
}
const setColorUV = (color) => {
	const colorList = {
		'#ff8b04': 0,
		'#999999': 0.04,
		'#d3ac10': 0.19,
		'#ffbec4': -0.06,
		'#d0d5c6': 0.55
	}
	for (let [key, value] of Object.entries(srcUVslist)) {
		for (let i = 0; i < modelAttUVarr(key).length; i++) {
			modelAttUVarr(key)[i] = value[i] + colorList[color]
		}
		nodes.Sketchfab_model.getObjectByName(key).geometry.getAttribute('uv').needsUpdate = true
	}

}

const switcherModel = nodes.Sketchfab_model.getObjectByName('Object_6001')
const { actions } = useAnimations(animations, nodes.Sketchfab_model)
let currentAction = actions.Animation
// currentAction.play()
const animationPlay = ref(true)
provide('animationPlay', animationPlay)

watch(
	() => props.color,
	(color) => {
		setColorUV(color)
	},
	{ immediate: true },
)
watch(
	() => animationPlay.value,
	(play) => {
		if (play) {
			currentAction.reset().play()
			switcherModel.rotateY(-Math.PI)
		} else {
			currentAction.fadeOut(0.6).paused = true
			switcherModel.rotateY(Math.PI)
		}
	},
	{ immediate: true },
)
</script>

<template>
	<Levioso :range="[-0.5, -0.5]" :speed="2">
		<primitive :position="[-2, 0, 0]" :object="nodes.Sketchfab_model" :scale="3.0">
			<svgCom :model="nodes.Sketchfab_model" />
		</primitive>
	</Levioso>
	<ContactShadows :opacity="0.3" :blur="2.6" :position="[0, -2, 0]" />
</template>

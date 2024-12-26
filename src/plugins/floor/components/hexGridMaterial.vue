<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 09:31:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-26 16:41:08
-->
<template>
	<CustomShaderMaterial :baseMaterial="THREE.MeshPhongMaterial" :vertexShader="vertexShader" :fragmentShader="fragmentShader" :uniforms="uniforms" />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { CustomShaderMaterial } from '@tresjs/cientos'
import fragmentShader from '../shaders/hexGridMaterial.frag'

const props = defineProps({
	cutSectionColor: {
			default: '#aaff11',
	},
})

const vertexShader = `
varying vec2 uvPosition;
void main() {
    uvPosition = uv;
}
`

const uniforms = {
	cutSectionColor: {
			value: new THREE.Color(props.cutSectionColor),
	},
}

watch(
	() => props.cutSectionColor,
	(cutSectionColor) => {
			uniforms.cutSectionColor.value.set(cutSectionColor)
	},
)
</script>

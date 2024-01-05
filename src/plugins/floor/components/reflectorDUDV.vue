<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-25 11:41:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-05 20:49:22
-->


<template>
	<TresGroup :scale="props.scale">
		<primitive :object="mirror" :position-y="-0.01" />
		<primitive :object="gridHelp" />
	</TresGroup>
</template>

<script lang="ts" setup>
import { Mesh, PlaneGeometry, RepeatWrapping, GridHelper } from "three"
import { useTexture } from '@tresjs/core'
import { Reflector, ReflectorDudvMaterial } from '../lib/alienJS/all.three.js'

import { watchEffect, watch } from 'vue'
const props = withDefaults(defineProps<{
	reflectivity?: Number
	showGridHelper?: boolean
	scale?: Number
}>(), {
	reflectivity: 0.8,
	scale: 1.0,
	showGridHelper: true,
})
const reflector = new Reflector()
const gridHelp = new GridHelper(9.5, 10)
gridHelp.visible = props.showGridHelper

const { map } = await useTexture({ map: './plugins/floor/image/waterdudv.jpg' })
map.wrapS = RepeatWrapping
map.wrapT = RepeatWrapping
map.repeat.set(6, 3)
const material = new ReflectorDudvMaterial({
	map: map,
	reflectivity: props.reflectivity
});
material.uniforms.tReflect = { value: reflector.renderTarget.texture }
material.uniforms.tReflectBlur = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform


const mirror = new Mesh(new PlaneGeometry(10, 10), material)
mirror.rotation.x = -Math.PI / 2
mirror.add(reflector)
mirror.onBeforeRender = (rendererSelf: any, sceneSelf: any, cameraSelf: any) => {
	mirror.visible = false
	reflector.update(rendererSelf, sceneSelf, cameraSelf)
	mirror.visible = true
}
watchEffect(() => {
	if (props.reflectivity) {
		material.uniforms.uReflectivity.value = props.reflectivity
	}
})

watch(
	() => props.showGridHelper,
	(newVal) => {
		gridHelp.visible = newVal
	}
)
</script>
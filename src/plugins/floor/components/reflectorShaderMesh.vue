<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 16:05:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 15:25:35
-->

<template>
	<TresGroup :position="props.position" :scale="props.scale">
		<primitive :object="meshOB" />
		<primitive :object="gridHelp" />
		<!-- <TresGridHelper v-if="props.showGridHelper" :args="[9.5, 10]" /> -->
	</TresGroup>
</template>

<script lang="ts" setup>
import { Vector2, PlaneGeometry, Mesh, RepeatWrapping, Color, GridHelper } from "three"
import { useTexture, useTresContext } from '@tresjs/core'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'
import { watchEffect, watch } from 'vue'
const props = withDefaults(defineProps<{
	reflectivity?: Number // 反射率
	mirror?: Number	// 去除纹理 镜面化
	mixStrength?: Number	//混合
	showGridHelper?: boolean
	color?: string
	position?: Array<number>
	scale?: Number // 大小
}>(), {
	reflectivity: 0.2,
	mirror: 0.1,
	mixStrength: 9,
	showGridHelper: true,
	color: '#ffffff',
	position: [0, -1, 0],
	scale: 1.0
})

const { scene } = useTresContext()

const pTexture = await useTexture(['./plugins/floor/image/concrete_wet_floor_basecolor.jpg', './plugins/floor/image/concrete_wet_floor_normal.jpg'])
pTexture[0].wrapS = RepeatWrapping
pTexture[0].wrapT = RepeatWrapping
pTexture[1].wrapS = RepeatWrapping
pTexture[1].wrapT = RepeatWrapping

const reflector = new Reflector()

const material = new ReflectorMaterial({
	reflectivity: props.reflectivity,	//反射率
	mirror: props.mirror,
	mixStrength: props.mixStrength,
	color: new Color(props.color),
	map: pTexture[0],
	normalMap: pTexture[1],
	normalScale: new Vector2(5, 5),
	fog: scene.fog,
	dithering: true
})
material.uniforms.tReflect = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform

const geometry = new PlaneGeometry(10, 10)
const meshOB = new Mesh(geometry, material)
meshOB.name = "reflectorShaderMesh"
meshOB.position.y = -.01
meshOB.rotation.x = -Math.PI / 2
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
	meshOB.visible = false
	reflector.update(rendererSelf, sceneSelf, cameraSelf)
	meshOB.visible = true
}

const gridHelp = new GridHelper(9.5, 10)
gridHelp.visible = props.showGridHelper
watchEffect(() => {
	if (props.reflectivity) {
		material.uniforms.uReflectivity.value = props.reflectivity
	}
	if (props.mirror) {
		material.uniforms.uMirror.value = props.mirror
	}
	if (props.mixStrength) {
		material.uniforms.uMixStrength.value = props.mixStrength
	}
	if (props.color) {
		material.uniforms.uColor.value = new Color(props.color)
	}
})
watch(
	() => props.showGridHelper,
	(newVal) => {
		gridHelp.visible = newVal
	}
)

</script>
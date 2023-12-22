<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 16:05:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-22 20:04:07
-->

<template>
	<primitive :object="meshOB" />
</template>

<script lang="ts" setup>
import { Vector2, PlaneGeometry, Mesh, RepeatWrapping } from "three"
import { useTexture, useTresContext } from '@tresjs/core'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'

const { scene } = useTresContext()

const pTexture = await useTexture(['./plugins/floor/image/concrete_wet_floor_basecolor.jpg', './plugins/floor/image/concrete_wet_floor_normal.jpg'])
pTexture[0].wrapS = RepeatWrapping
pTexture[0].wrapT = RepeatWrapping
pTexture[1].wrapS = RepeatWrapping
pTexture[1].wrapT = RepeatWrapping

const reflector = new Reflector()
debugger
const material = new ReflectorMaterial({
	map: pTexture[0],
	normalMap: pTexture[1],
	normalScale: new Vector2(5, 5),
	mirror: 1,
	mixStrength: 99,
	fog: scene.fog,
	dithering: true
});
material.uniforms.tReflect = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform

const geometry = new PlaneGeometry(100, 100)
const meshOB = new Mesh(geometry, material)
meshOB.position.y = -1.0
meshOB.rotation.x = -Math.PI / 2
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
	reflector.update(rendererSelf, sceneSelf, cameraSelf)
};
</script>
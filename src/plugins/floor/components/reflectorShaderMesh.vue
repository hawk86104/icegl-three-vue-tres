<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 16:05:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-22 20:35:05
-->

<template>
	<primitive :object="meshOB" />
	<TresGridHelper :args="[10, 10]" />
</template>

<script lang="ts" setup>
import { Vector2, PlaneGeometry, Mesh, RepeatWrapping, Color } from "three"
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
	reflectivity: 0.1,	//反射率
	mirror: 1,
	mixStrength: 5,
	// color: new Color('#ffffff'),
	map: pTexture[0],
	normalMap: pTexture[1],
	normalScale: new Vector2(5, 5),
	fog: scene.fog,
	dithering: false
});
material.uniforms.tReflect = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform

const geometry = new PlaneGeometry(10, 10)
const meshOB = new Mesh(geometry, material)
meshOB.position.y = -.01
meshOB.rotation.x = -Math.PI / 2
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
	reflector.update(rendererSelf, sceneSelf, cameraSelf)
};
</script>
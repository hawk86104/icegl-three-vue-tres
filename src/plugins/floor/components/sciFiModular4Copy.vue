<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:08:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-26 17:47:57

 Sketchfab_model 
 Cube001__0 Cube009__0  Cube013__0 Cube014__0 Cube015__0 Cube016__0
-->	
<template>
	<TresGroup :scale="props.scale" :rotation-x="-Math.PI / 2" :position="props.position">
		<primitive :object="meshOB[0]" />
		<primitive :object="meshOB[1]" :rotation-z="-Math.PI / 2" />
		<primitive :object="meshOB[2]" :rotation-z="Math.PI / 2" />
		<primitive :object="meshOB[3]" :rotation-z="-Math.PI" />
	</TresGroup>
</template>

<script lang="ts" setup>
import { useGLTF } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'
import { Vector2, Color, Mesh } from "three"

const props = withDefaults(
	defineProps<{
		position?: Array<number>
		scale?: Array<number>
	}>(),
	{
		position: [0, -1, 0],
		scale: [1, 1, 1],
	},
)
const { scene } = useTresContext()
const { nodes } = await useGLTF(
	'./plugins/floor/model/modular_sci-fi_floor.glb',
	{ draco: true, decoderPath: './draco/' })
const ob = nodes.Cube016__0
console.log(ob)

const meshOB = []
for (let index = 0; index < 4; index++) {
	const reflector = new Reflector()
	const material = new ReflectorMaterial({
		reflectivity: 6,	//反射率
		mirror: 0.1,
		mixStrength: 3,
		color: new Color('#fff'),
		map: ob.material.map.clone(),
		normalMap: ob.material.normalMap.clone(),
		normalScale: new Vector2(1, 1),
		fog: scene.fog,
		dithering: true
	})
	material.uniforms.tReflect = reflector.renderTargetUniform
	material.uniforms.uMatrix = reflector.textureMatrixUniform

	meshOB[index] = new Mesh(ob.geometry, material)
	meshOB[index].add(reflector)
	meshOB[index].onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
		meshOB[index].visible = false
		reflector.update(rendererSelf, sceneSelf, cameraSelf)
		meshOB[index].visible = true
	}
}
</script>
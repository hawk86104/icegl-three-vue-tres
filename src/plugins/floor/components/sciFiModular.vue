<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:08:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-18 12:02:37

 Sketchfab_model 
 Cube001__0 Cube009__0  Cube013__0 Cube014__0 Cube015__0 Cube016__0
-->	
<template>
	<primitive :rotation-x="-Math.PI / 2" :position="props.position" :object="meshOB" />
</template>

<script lang="ts" setup>
import { useGLTF } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'
import { Vector2, Color, Mesh, Matrix4 } from "three"
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

const props = withDefaults(
	defineProps<{
		position?: Array<number>
	}>(),
	{
		position: [0, -1, 0],
	},
)
const { scene } = useTresContext()
const { nodes } = await useGLTF(
	'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/floor/modelDraco.glb',
	{ draco: true, decoderPath: './draco/' })
const ob = nodes.Cube016__0
console.log(ob)

const geometry = ob.geometry
const bufferGeometries = BufferGeometryUtils.mergeGeometries([
	geometry.clone(),
	geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(-Math.PI / 2)),
	geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(Math.PI / 2)),
	geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(-Math.PI))
])

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
const meshOB = new Mesh(bufferGeometries, material)
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
	meshOB.visible = false
	reflector.update(rendererSelf, sceneSelf, cameraSelf)
	meshOB.visible = true
}
</script>
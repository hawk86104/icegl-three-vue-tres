<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 16:35:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-07 16:00:40
-->
<template>
    <primitive :object="meshMerged" cast-shadow receive-shadow :position="[-17, 0, 5]" :scale="[0.7, 0.7, 0.7]" name="实验楼" :rotation-y="Math.PI / 2" />
    <primitive :object="nodes.Sketchfab_model" cast-shadow :position="[8, 0, 16]" :scale="[0.08, 0.08, 0.08]" name="树" />
</template>
<script setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF, useAnimations } from '@tresjs/cientos'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/laboratoryBuild.gltf', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()

const geometryArr = []
const materialArr = []
model.traverse((child) => {
    child.updateMatrixWorld(true)
    if (child.isMesh) {
        child.geometry.applyMatrix4(child.matrixWorld)
        geometryArr.push(child.geometry)

        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 0.1
        child.material.envmap = scene.value.background
        materialArr.push(child.material)
    }
})
const geometryMerged = BufferGeometryUtils.mergeGeometries(geometryArr, true)
const meshMerged = new THREE.Mesh(geometryMerged, materialArr)

const { nodes, animations } = await useGLTF('./plugins/digitalPark/model/tree_animate/scene.gltf', { draco: true, decoderPath: './draco/' })

const { actions } = useAnimations(animations, nodes.Sketchfab_model)
const currentAction = actions.MorphBake
currentAction.play()
</script>

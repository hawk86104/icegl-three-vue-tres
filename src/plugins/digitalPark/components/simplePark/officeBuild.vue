<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 16:35:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-07 15:31:11
-->
<template>
    <primitive :object="model" cast-shadow receive-shadow :position="[16, 0, -5]" :scale="[0.2, 0.2, 0.2]" name="办公大厅" :rotation-y="Math.PI" />
</template>
<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/officeBuild.glb', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()
model.traverse((child) => {
    if (child.isMesh) {
        child.frustumCulled = false // 不剔除
        child.material.side = THREE.DoubleSide
        child.castShadow = true
        child.receiveShadow = true
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 0.8
        child.material.envmap = scene.value.background
    }
})
// renderer.value.shadowMap.enabled = true
// renderer.value.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.value.shadowMap.opacity = 0
</script>

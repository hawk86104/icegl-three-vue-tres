<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-07 15:53:08
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 21:13:41
-->
<template>
    <primitive cast-shadow receive-shadow :object="model" name="主场景" />
</template>
<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/vr_sculpture_park/scene.gltf', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()

model.traverse(async (child) => {
    if (child.isMesh) {
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 0.6
        child.material.envmap = scene.value.background
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = false // 不剔除
    }
    if (child.isObject3D) {
        child.frustumCulled = false // 不剔除
        child.castShadow = true
        child.receiveShadow = true
    }
})
</script>

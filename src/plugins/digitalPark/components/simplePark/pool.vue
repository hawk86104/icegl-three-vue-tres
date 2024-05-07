<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-07 15:53:08
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-07 16:02:29
-->
<template>
    <primitive :object="model" cast-shadow :position="[12, 1, -16]" :scale="[0.6, 0.5, 0.6]" name="水池" />
</template>
<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'

const { scene: model, materials } = await useGLTF('./plugins/digitalPark/model/pool.glb', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()
debugger
model.traverse((child) => {
    if (child.isMesh) {
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 1
        child.material.envmap = scene.value.background
    }
})
</script>

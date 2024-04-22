<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 09:56:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-22 11:02:24
-->
<template>
    <primitive :object="caustics.group" :position="[0, 0.003, 0]" />
    <primitive :object="caustics.helper" :visible="false" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Caustics } from '@pmndrs/vanilla'

const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 32)
const mat = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0,
})
mat.color.setHSL(Math.random(), 1, 0.5)
mat.thickness = 2
const torusMesh = new THREE.Mesh(geometry, mat)
torusMesh.position.set(0, 6, 0)

torusMesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
        child.castShadow = false
        child.receiveShadow = false
    }
})
const { renderer } = useTresContext()
const caustics = Caustics(renderer.value, { frames: Infinity, resolution: 1024, worldRadius: 0.3 })
caustics.params.backside = true
caustics.scene.add(torusMesh)

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    caustics.update()
})
</script>

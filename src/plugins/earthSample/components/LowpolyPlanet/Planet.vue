<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-13 09:05:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-03 12:24:32
-->
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import Airplane from './airplane.vue'
import Cloud from './cloud.vue'

const { nodes } = await useGLTF(
  './plugins/earthSample/model/lowpolyPlanet/planet.gltf',
)

const planet = nodes.Planet
const icosphere = nodes.Icosphere
planet.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (!planet) return
  planet.rotation.y += delta * 0.04
  planet.rotation.z += delta * 0.02
  planet.rotation.x += delta * 0.05
  planet.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="planet" />
  <Airplane :planet="icosphere" />
  <Cloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="icosphere" />
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-13 09:05:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-13 09:09:33
-->
<script setup lang="ts">
import Airplane from './Airplane.vue'
import Cloud from './Cloud.vue'
import { useGLTF } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/planet.gltf',
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

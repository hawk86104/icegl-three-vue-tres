<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-13 09:05:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-03 12:24:27
-->
<script setup lang="ts">
import type { Object3D } from 'three'
import { shallowRef, watch } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF('./plugins/earthSample/model/lowpolyPlanet/cloud.gltf')
const cloudRef = shallowRef()

const cloud = scene.children[0] as Object3D
cloud.castShadow = true
// create a function to return a random number between two values with random sign
function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min
  return Math.random() < 0.5 ? -randomNumber : randomNumber
}

cloud.position.set(random(-8, 8), random(0.5, 1), random(-8, 8))

const size = random(0.5, 1)
cloud.scale.set(size, size, size)
cloud.updateMatrixWorld()

watch(
  () => props.planet,
  (planet) => {
    if (!planet) return
    cloud.lookAt(planet.position)
    cloud.updateMatrixWorld()
  },
)

const { onLoop } = useRenderLoop()

let angle = random(-1, 1) * Math.PI
const speed = Math.random() / 10
onLoop(({ delta }) => {
  if (!cloud) return

  const radius = Math.abs(props.planet.geometry.boundingSphere.radius - 0.5)
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  cloud.position.x = x
  cloud.position.z = z
  cloud.rotation.y = -angle
  cloud.lookAt(props.planet.position)
  cloud.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="scene" cast-shadow />
</template>

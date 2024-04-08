<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, useSlots, onUnmounted, watch, toRaw } from 'vue'
import type { CubeTexture, Texture } from 'three'
//@ts-ignore
import { useTresContext, useRenderLoop } from '@tresjs/core'
import type { EnvironmentOptions } from './const'
import { useEnvironment } from '.'
import EnvSence from './envSence'
import * as THREE from 'three'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  //@ts-ignore
  files: [],
  path: '',
  preset: undefined,
  resolution: 256,
  near: 1,
  far: 1000,
  frames: Infinity
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose({ texture })

const { extend, renderer, scene } = useTresContext()
let slots = null as any
let fbo = null as null | THREE.WebGLCubeRenderTarget
let cubeCamera = null as null | THREE.CubeCamera
if (useSlots().default !== undefined) {
  extend({ EnvSence })
  //@ts-ignore
  slots = useSlots().default()
  fbo = new THREE.WebGLCubeRenderTarget(props.resolution)
  fbo.texture.type = THREE.HalfFloatType
  cubeCamera = new THREE.CubeCamera(props.near, props.far, fbo)
}
const envSence = ref<EnvSence | null>(null)
onUnmounted(() => {
  envSence.value?.destructor()
  fbo?.dispose()
})
const { onBeforeLoop } = useRenderLoop()
let count = 1
onBeforeLoop(() => {
  if (cubeCamera && envSence.value) {
    if (props.frames === Infinity || count < props.frames) {
      cubeCamera.update(renderer.value, toRaw(envSence.value.virtualScene))
      count++
    }
  }
})
//@ts-ignore
const useEnvironmentTexture = await useEnvironment(props).texture
watch(useEnvironmentTexture, (value) => {
  if (fbo) {
    scene.value.environment = fbo.texture
    if (props.background) {
      scene.value.background = fbo.texture
    }
  }
}, { immediate: true, deep: true })

texture.value = useEnvironmentTexture

</script>
<template>
  <TresEnvSence v-if="fbo" ref="envSence">
    <slot />
  </TresEnvSence>
</template>

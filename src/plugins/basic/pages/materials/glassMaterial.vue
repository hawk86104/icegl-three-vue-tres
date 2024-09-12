<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-05 10:24:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 09:32:05
-->
<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'

import { OrbitControls, MeshGlassMaterial, Box, Sphere } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, DoubleSide } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const context = ref()
const glassMaterialRef = shallowRef()
const boxRef = shallowRef()

watch(glassMaterialRef, (value) => {
  boxRef.value.instance.material.dispose()
  boxRef.value.instance.material = value.instance
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="context" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh :position-x="3">
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <MeshGlassMaterial ref="glassMaterialRef" />
    </TresMesh>
    <Sphere :scale="0.5">
      <MeshGlassMaterial />
    </Sphere>
    <Box ref="boxRef" :position-x="-3" />
    <TresMesh :position="[0, 0, -1]">
      <TresPlaneGeometry :args="[3, 3]" />
      <TresMeshBasicMaterial :side="DoubleSide" :color="0xff1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>

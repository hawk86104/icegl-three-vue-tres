<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 11:12:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:42:34
-->
<script setup lang="ts">

import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { randomLoading as loading } from 'PLS/UIdemo'
import laptop from '../../components/laptop.vue'

const gl = {
  clearColor: '#000',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <loading />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[-5, 4, 3]" />
    <OrbitControls />
    <Suspense>
      <laptop />
    </Suspense>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 3, 0]" :cast-shadow="true" :shadow-camera-far="50"
      :shadow-camera-left="-10" :shadow-camera-right="10" :shadow-camera-top="10" :shadow-camera-bottom="-10" />
  </TresCanvas>
</template>
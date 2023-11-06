<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-11 10:51:25
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 10:00:17
-->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MapControls, Sphere } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <MapControls />
    <Sphere :scale="0.5">
      <TresMeshNormalMaterial />
    </Sphere>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

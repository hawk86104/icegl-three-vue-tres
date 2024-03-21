<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-09-20 08:49:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 10:10:51
-->
<script setup lang="ts">

import { BasicShadowMap, NoToneMapping } from 'three'
import { PointerLockControls, KeyboardControls, Stats } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => console.log(state)
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <Stats />
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <PointerLockControls make-default @is-lock="state => isActive(state)" />
    <KeyboardControls head-bobbing />

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

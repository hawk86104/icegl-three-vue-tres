<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-12 11:41:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-05 11:32:05
-->
<script setup lang="ts">

import { OrbitControls, MeshWobbleMaterial } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { ref } from 'vue'
import { Pane } from 'tweakpane';

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const context = ref()
const color = ref('#5384ff')
const paneControl = new Pane({
  title: '流体波动',
  expanded: true,
});
paneControl.addBinding(color, 'value', { label: '颜色' })
</script>

<template>
  <TresCanvas v-bind="gl" ref="context" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial :color="color" :speed="3" :factor="8" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>

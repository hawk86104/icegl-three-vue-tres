<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import laptop from '../../components/laptop.vue'
import { OrbitControls, ContactShadows } from '@tresjs/cientos'

const gl = {
  clearColor: '#241a1a',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[-5, 4, 3]" />
    <OrbitControls />
    <Suspense>
      <laptop/>
    </Suspense>
    <!-- <ContactShadows :blur="3.5" :resolution="512" :opacity="1" /> -->
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 3, 0]" :cast-shadow="true" :shadow-camera-far="50"
      :shadow-camera-left="-10" :shadow-camera-right="10" :shadow-camera-top="10" :shadow-camera-bottom="-10" />
  </TresCanvas>
</template>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 15:06:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 15:38:42
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { ScrollControls } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'
import particalFBO from '../components/particalFBO.vue'

const progress = ref(0)

watchEffect(() => {
  console.log('jaime ~ progress:', progress.value)
})

const gl = {
  clearColor: '#000',
  outputColorSpace: SRGBColorSpace,
  windowSize: true,
  disableRender: true,
  powerPreference: "high-performance",
  antialias: false,
  alpha: false,
  useLegacyLights: false,
  physicallyCorrectLights: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, -4]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />

    <ScrollControls v-model="progress" :distance="10" :smooth-scroll="0.1" html-scroll>
      <Suspense>
        <particalFBO :progress="progress" />
      </Suspense>
    </ScrollControls>
  </TresCanvas>
  <main>
    <section>
      <h1>1 section</h1>
    </section>
    <section>
      <h1>2 section</h1>
    </section>
    <section>
      <h1>3 section</h1>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: transparent;
  position: relative;
  z-index: 1;
}

section {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

h1 {
  color: #f7f7f7;
}
</style>

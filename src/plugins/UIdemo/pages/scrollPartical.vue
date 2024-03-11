<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 15:06:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 14:27:46
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ScrollControls, Box } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'
import particalMesh from '../components/particalMesh.vue'

const scRef = ref()
const boxRef = ref()
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

const { onLoop } = useRenderLoop()
onLoop(() => {
  // if (boxRef.value) {
  //   boxRef.value.value.rotation.x = progress.value * 10
  //   boxRef.value.value.rotation.y = progress.value * 2
  // }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, -4]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
    <!-- <TresGridHelper :args="[10, 10]" /> -->

    <ScrollControls ref="scRef" v-model="progress" :distance="10" :smooth-scroll="0.1" html-scroll>
      <!-- <Box ref="boxRef" :scale="0.5" :color="0xff00ff" :position="[-1, 1, 0]" /> -->
      <Suspense>
        <particalMesh :progress="progress" />
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
  </main>
</template>

<style scoped>
.scroll {
  height: 200vh;
}

main {
  background-color: transparent;
  position: relative;
  z-index: 1;
}

section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  /* outline: 1px solid red; */
}

h1 {
  color: #f7f7f7;
}
</style>

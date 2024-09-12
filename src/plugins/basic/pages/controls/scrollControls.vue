<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 08:56:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 10:44:06
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { ScrollControls, Stars, Sphere, Box } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const scRef = ref()
const sphereRef = ref()
const boxRef = ref()
const progress = ref(0)

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ progress:', progress.value)
})

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}


const { onLoop } = useRenderLoop()
onLoop(() => {
  if (boxRef.value) {
    boxRef.value.instance.rotation.x = progress.value * 10
    boxRef.value.instance.rotation.y = progress.value * 2
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" window-size class="canvas-class">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />

    <ScrollControls ref="scRef" v-model="progress" :distance="10" :smooth-scroll="0.1" html-scroll>
      <Sphere ref="sphereRef" :scale="0.1" :position="[1, 2, 0]" />
      <Box ref="boxRef" :scale="0.5" :color="0xff00ff" :position="[-1, 1, 0]" />
    </ScrollControls>
  </TresCanvas>
  <main>
    <section>
      <h1>First section</h1>
    </section>

    <section>
      <h2>Second section</h2>
    </section>
  </main>
</template>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  right: 0;
}

.scroll {
  height: 200vh;
}

.container {
  height: 50vh;
  overflow: scroll;
}

main {
  background-color: transparent;
  position: relative;
  z-index: 1;
}

.canvas-class {
  z-index: 0 !important;
}

section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  outline: 1px solid red;
}

h1,
h2,
h3 {
  color: #f7f7f7;
}
</style>

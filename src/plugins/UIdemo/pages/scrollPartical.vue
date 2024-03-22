<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 15:06:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:55:06
-->
<script setup lang="ts">
import { bubbleLoading as loading } from 'PLS/UIdemo'
import { ref, watchEffect, reactive } from 'vue'

import { ScrollControls } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'
import { Pane } from 'tweakpane'
import particalFBO from '../components/particalFBO.vue'
import particalPass from '../components/particalPass.vue'

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
const paneState = reactive({
  pass: true,
  color: '#ffaa00'
})
const paneControl = new Pane({
  title: '参数',
  expanded: true
})
paneControl.addBinding(paneState, 'pass', {
  label: '后处理'
})
paneControl.addBinding(paneState, 'color', {
  label: '颜色'
})
</script>

<template>
  <loading :styleNum="4" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, -4]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />

    <particalPass :use="paneState.pass" />
    <ScrollControls v-model="progress" :distance="10" :smooth-scroll="0.1" html-scroll>
      <Suspense>
        <particalFBO :progress="progress" :color="paneState.color" />
      </Suspense>
    </ScrollControls>
  </TresCanvas>
  <main>
    <section>
      <h1>关羽 - GuanYu</h1>
    </section>
    <section>
      <h1 style="margin-left: -11em;margin-bottom: -10em;">大脑 - Brain</h1>
    </section>
    <section>
      <h1 style="margin-left: 11em;margin-bottom: -10em;">设备 - Device</h1>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: transparent;
  position: relative;
  /* z-index: 1; */
}

section {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

h1 {
  color: #f7f7f7;
  margin-left: 6em;
  font-size: 3em;
  text-align: center;
}
</style>
<style>
.tp-dfwv {
  position: fixed !important;
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, TransformControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = ref()
const sphereRef = ref()

const transformRef = ref()

function changeObject(object: any) {
  transformRef.value = object
}

const context = ref()

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  space: 'world',
  axis: 'XYZ',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const pane = new Pane()

pane
  .addBlade({
    view: 'list',
    label: '模式',
    options: [
      { text: '移动', value: 'translate' },
      { text: '旋转', value: 'rotate' },
      { text: '缩放', value: 'scale' },
    ],
    value: controlsState.mode,
  })
  .on('change', (e: any) => {
    controlsState.mode = e.value
  })

pane.addBinding(controlsState, 'enabled', { label: '开启' })

pane
  .addBlade({
    view: 'list',
    label: 'Space',
    options: [
      { text: '世界坐标', value: 'world' },
      { text: '本地坐标', value: 'local' },
    ],
    value: controlsState.space,
  })
  .on('change', (e: any) => {
    controlsState.space = e.value
  })

pane.addBlade({
  view: 'list',
  label: '轴',
  options: [
    { text: 'X', value: 'X' },
    { text: 'Y', value: 'Y' },
    { text: 'Z', value: 'Z' },
    { text: 'XY', value: 'XY' },
    { text: 'YZ', value: 'YZ' },
    { text: 'XZ', value: 'XZ' },
    { text: 'XYZ', value: 'XYZ' },
  ],
  value: controlsState.axis,
})

pane.addBinding(controlsState, 'size', {
  label: '大小',
  step: 0.01,
  min: 0,
  max: 10,
})

pane.addBinding(controlsState, 'showX', { label: '显示X轴' })
pane.addBinding(controlsState, 'showY', { label: '显示Y轴' })
pane.addBinding(controlsState, 'showZ', { label: '显示Z轴' })

</script>

<template>
  <TresCanvas v-bind="gl" ref="context" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />

    <TresMesh ref="boxRef" :position="[-2, 1, 0]" @click="changeObject(boxRef)">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TransformControls v-if="transformRef" :object="transformRef" v-bind="controlsState" />
    <TresMesh ref="sphereRef" :position="[2, 1, 0]" @click="changeObject(sphereRef)">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresGridHelper />
  </TresCanvas>
</template>

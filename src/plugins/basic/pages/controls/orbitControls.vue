<!-- eslint-disable no-console -->
<script setup lang="ts">

import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { reactive } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  maxAzimuthAngle: Math.PI,
  minAzimuthAngle: -Math.PI,
  enablePan: true,
  maxDistance: 100,
  minDistance: 0,
  minZoom: 0,
  maxZoom: 100,
  zoomSpeed: 1,
  enableRotate: true,
  rotateSpeed: 1,
})

const { pane } = useTweakPane()

pane.addBinding(controlsState, 'enableDamping', { label: '启用阻尼', })
pane.addBinding(controlsState, 'dampingFactor', {
  label: '阻尼系数',
  step: 0.01,
  min: 0,
  max: 1,
})
pane.addBinding(controlsState, 'enableZoom', { label: '启用缩放', })

pane.addBinding(controlsState, 'enablePan', { label: '启用移动', })

const rotateFolder = pane.addFolder({ title: '旋转' })
rotateFolder.addBinding(controlsState, 'autoRotate', { label: '自动旋转' })
rotateFolder.addBinding(controlsState, 'autoRotateSpeed', {
  label: '自动旋转速度',
  step: 0.01,
  min: 0,
  max: Math.PI,
})

// Polar
const angleFolder = pane.addFolder({ title: '角度' })
angleFolder.addBinding(controlsState, 'maxPolarAngle', {
  label: 'max极角',
  step: 0.01,
  min: 0,
  max: Math.PI,
})
angleFolder.addBinding(controlsState, 'minPolarAngle', {
  label: 'min极角',
  step: 0.01,
  min: 0,
  max: Math.PI,
})
angleFolder.addBinding(controlsState, 'maxAzimuthAngle', {
  label: 'max方位角',
  step: 0.01,
  min: 0,
  max: 2 * Math.PI,
})
angleFolder.addBinding(controlsState, 'minAzimuthAngle', {
  label: 'min方位角',
  step: 0.01,
  min: 0,
  max: 2 * Math.PI,
})

const distances = pane.addFolder({ title: '距离' })
distances.addBinding(controlsState, 'maxDistance', {
  label: '最大距离',
  step: 0.01,
  min: 0,
  max: 100,
})
distances.addBinding(controlsState, 'minDistance', {
  label: '最小距离',
  step: 0.01,
  min: 0,
  max: 100,
})

const zoomFolder = pane.addFolder({ title: '缩放' })
zoomFolder.addBinding(controlsState, 'enableZoom', { label: '开启', })
zoomFolder.addBinding(controlsState, 'minZoom', {
  label: '最小',
  step: 0.01,
  min: 0,
  max: 10,
})
zoomFolder.addBinding(controlsState, 'maxZoom', {
  label: '最大',
  step: 0.01,
  min: 0,
  max: 100,
})
zoomFolder.addBinding(controlsState, 'zoomSpeed', {
  label: '速度',
  step: 0.01,
  min: 0,
  max: 20,
})
function onChange() {
  /* console.log('change') */
}

function onStart() {
  /*  console.log('start') */
}

function onEnd() {
  /*   console.log('end') */
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls v-bind="controlsState" @change="onChange" @start="onStart" @end="onEnd" />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

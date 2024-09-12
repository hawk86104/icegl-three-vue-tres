<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { Pane } from 'tweakpane'
import { CameraControls } from '@tresjs/cientos'
import { MathUtils, BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  distance: 5,
  minDistance: 0,
  maxDistance: 100,
})

const controlsRef = shallowRef()
const boxMeshRef = shallowRef()

const pane = new Pane()

const distanceFolder = pane.addFolder({ title: '距离参数' })
distanceFolder.addBinding(controlsState, 'distance', {
  label: '设置距离',
  step: 0.01,
  min: 0,
  max: 100,
})
distanceFolder.addBinding(controlsState, 'minDistance', {
  label: '最小距离',
  step: 0.01,
  min: 0,
  max: 10,
})
distanceFolder.addBinding(controlsState, 'maxDistance', {
  label: '最大距离',
  step: 0.01,
  min: 0,
  max: 100,
})

// Basic example from https://yomotsu.github.io/camera-controls/examples/basic.html
const dollyFolder = pane.addFolder({ title: '远近' })
dollyFolder.addButton({ title: '(+1)' }).on('click', () => {
  controlsRef?.value?.instance?.dolly(1, true)
})
dollyFolder.addButton({ title: '(-1)' }).on('click', () => {
  controlsRef?.value?.instance?.dolly(-1, true)
})

const rotateFolder = pane.addFolder({ title: '旋转' })
rotateFolder.addButton({ title: 'Rotate theta 45°' }).on('click', () => {
  controlsRef?.value?.instance?.rotate(45 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate theta -90°' }).on('click', () => {
  controlsRef?.value?.instance?.rotate(-90 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate theta 360°' }).on('click', () => {
  controlsRef?.value?.instance?.rotate(360 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate phi 20°' }).on('click', () => {
  controlsRef?.value?.instance?.rotate(0, 20 * MathUtils.DEG2RAD, true)
})

const moveFolder = pane.addFolder({ title: '移动' })
moveFolder.addButton({ title: '对焦到 box of the mesh' }).on('click', () => {
  controlsRef?.value?.instance?.fitToBox(boxMeshRef.value, true)
})


function onChange() {
  console.log('change')
}

function onStart() {
  console.log('start')
}

function onEnd() {
  console.log('end')
}
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <CameraControls v-bind="controlsState" ref="controlsRef" make-default @change="onChange" @start="onStart"
      @end="onEnd"
/>
    <TresGridHelper :position="[0, -1, 0]" />
    <TresMesh ref="boxMeshRef">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial color="orange" wireframe />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" />

        <OrbitControls />
        <TresGridHelper :args="[10, 10]" />

        <waveC v-bind="typeState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import waveC from '../components/waveC.vue'

const gl = {
    clearColor: '#222',
    shadows: true,
    alpha: false,

    shadowMapType: THREE.BasicShadowMap,
    outputColorSpace: THREE.SRGBColorSpace,
    toneMapping: THREE.NoToneMapping,
    useLegacyLights: true,
    antialias: true, //开启锯齿
    logarithmicDepthBuffer: true,
}
const typeState = reactive({
    peakColor: '#ff6767',
    valleyColor: '#310039',
    wireframe: false,
    colorOffset: 0.9,
    colorDamping: 4.5,
    sinWaveFrequency: { x: 0.4, y: 0.3 },
    waveAmplitude: 0.8,
    sinWaveSpeed: { x: 0.6, y: 1.3 },
    perlinWaveIterations: 3,
    perlinWaveFrequency: 0.6,
    perlinWaveAmplitude: 0.5,
    perlinWaveSpeed: 0.6,
})

const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(typeState, 'wireframe', {
    label: '网格化',
})
paneControl.addBinding(typeState, 'peakColor', {
    label: '山峰颜色',
})
paneControl.addBinding(typeState, 'valleyColor', {
    label: '山谷颜色',
})
paneControl.addBinding(typeState, 'colorOffset', {
    label: '颜色偏移',
    min: 0.01,
    max: 3,
    step: 0.01,
})
paneControl.addBinding(typeState, 'colorDamping', {
    label: '颜色抑制',
    min: 0.01,
    max: 6,
    step: 0.01,
})
paneControl.addBinding(typeState, 'sinWaveFrequency', {
    label: '正弦波频率',
    picker: 'inline',
    x: { min: -1, step: 0.01, max: 1, inverted: true },
    y: { min: -1, step: 0.01, max: 1, inverted: true },
})
paneControl.addBinding(typeState, 'waveAmplitude', {
    label: '正弦波振幅',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(typeState, 'sinWaveSpeed', {
    label: '正弦波速度',
    picker: 'inline',
    x: { min: -3, step: 0.01, max: 3, inverted: true },
    y: { min: -3, step: 0.01, max: 3, inverted: true },
})
paneControl.addBinding(typeState, 'perlinWaveIterations', {
    label: '小波浪层数',
    min: 1,
    max: 7,
    step: 0.1,
})
paneControl.addBinding(typeState, 'perlinWaveFrequency', {
    label: '小波浪频率',
    min: 0,
    max: 5,
    step: 0.01,
})
paneControl.addBinding(typeState, 'perlinWaveAmplitude', {
    label: '小波浪幅度',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(typeState, 'perlinWaveSpeed', {
    label: '小波浪速度',
    min: 0,
    max: 2,
    step: 0.01,
})
</script>

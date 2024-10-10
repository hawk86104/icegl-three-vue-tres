<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-01 17:21:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 11:03:15
-->

<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[1, 1, 1]" />
        <TresAmbientLight :intensity="1" />
        <waterGlass v-bind="typeState" />

        <OrbitControls />
        <TresGridHelper :args="[1, 10]" />

        <Suspense>
            <Environment :intensity="16" :resolution="256" background :blur="0.6">
                <Lightformer :intensity="10" form="circle" :rotation-x="Math.PI / 2" :position="[2 * 4 - (3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="10" form="circle" :rotation-x="Math.PI / 2" :position="[-(3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="5" :rotation-y="-Math.PI / 2" :position="[-1, 0, 0]" :scale="[10, 0.2, 1]" />
                <Lightformer :intensity="5" :rotation-y="-Math.PI / 2" :position="[1, 0, 0]" :scale="[10, 0.2, 1]" />
            </Environment>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import * as THREE from 'three'
import { Environment, Lightformer } from 'PLS/basic'

import { Pane } from 'tweakpane'
import waterGlass from '../components/waterGlass.vue'

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
    color: '#b367ff',
    amplitude: 0.066,
    frequency: 5.0,
})
const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(typeState, 'color', {
    label: '颜色',
})
paneControl.addBinding(typeState, 'amplitude', {
    label: 'amplitude',
    min: 0.01,
    max: 0.2,
    step: 0.01,
})
paneControl.addBinding(typeState, 'frequency', {
    label: 'frequency',
    min: 0.1,
    max: 10,
    step: 0.1,
})
</script>

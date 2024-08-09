<template>
    <TresCanvas clearColor="#666666" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping autoRotate />

        <Suspense>
            <digitalGround v-bind="configState" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import digitalGround from '../components/digitalGround.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: false,
    scale: 1,
})
const configState = reactive({
    color: '#de62f2', 
    speed: 0.8,
    size: 10,
})

const paneControl = new Pane({
    title: 'digitalGround',
    expanded: true,
})
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'speed', {
    label: '速度',
    min: 0.1,
    max: 5.0,
    step: 0.1,
})
paneControl.addBinding(configState, 'size', {
    label: '大小',
    min: 0.1,
    max: 20,
    step: 0.1,
})
</script>

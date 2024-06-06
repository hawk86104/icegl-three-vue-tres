<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="6.0" />
        <Suspense>
            <shaderCircleWave />
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
import shaderCircleWave from '../components/shaderCircleWave.vue'

const reflectorState = reactive({
    reflectivity: 2.6,
    showGridHelper: false,
    scale: 1,
})
const configState = reactive({
    color: '#fff',
    opacity: 0.95,
    rotationZ: 0.01,
})

const paneControl = new Pane({
    title: 'video地面',
    expanded: true,
})
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', {
    label: '透明度',
    min: 0.0,
    max: 1.0,
    step: 0.01,
})
paneControl.addBinding(configState, 'rotationZ', {
    label: '自转速度',
    min: -0.1,
    max: 0.1,
    step: 0.01,
})
</script>

<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="3" />
        <Suspense>
            <earth />
        </Suspense>
        <Suspense>
            <smokeSphere v-bind="configState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import earth from '../components/earth.vue'
import smokeSphere from '../components/smokeSphere.vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'

const configState = reactive({
    color: '#00d5ff',
    opacity: 0.58,
    speed: 1.8,
    scale: 1.1,
    phiLength: 2 * Math.PI,
    thetaLength: Math.PI,
})
const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', { label: '透明度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(configState, 'speed', { label: '速度', min: 0.1, max: 5, step: 0.1 })
paneControl.addBinding(configState, 'scale', { label: '大小', min: 1.01, max: 2, step: 0.01 })
paneControl.addBinding(configState, 'phiLength', { label: '水平范围', min: 0, max: 2 * Math.PI, step: 0.01 })
paneControl.addBinding(configState, 'thetaLength', { label: '垂直范围', min: 0, max: Math.PI, step: 0.01 })
</script>

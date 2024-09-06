
<template>
    <!-- <loading /> -->
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 20, 30]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="2" />
        <Suspense>
            <Bubble v-bind="pcssConfig" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { ref, watch, reactive } from 'vue'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import Bubble from '../components/bubble.vue'
import { Pane } from 'tweakpane'

const dLight = ref(null)
watch(dLight, (newVal: any) => {
    if (newVal) {
        newVal.shadow.camera = new THREE.OrthographicCamera(-8.5, 8.5, 8.5, -8.5, 0.1, 20)
    }
})
const controlsState = reactive({
    enableDamping: true,
    enableZoom: true,
    autoRotate: true,
    enablePan: true,
    enableRotate: true,
    makeDefault: true,
})
const tcConfig = {
    clearColor: '#000000',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
}

const pcssConfig = reactive({
    opacity: 0.5,
})
const paneControl = new Pane({ title: '参数' })

paneControl.addBinding(pcssConfig, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.1,
})
</script>

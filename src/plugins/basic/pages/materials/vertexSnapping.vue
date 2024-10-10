<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[8, 6, 8]" :fov="45" :near="1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[7, 10, -5.5]" :intensity="5" />

        <TresMesh :position="[-5, 0.5, 5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[1.5, 1.5, 2]" />
            <TresMeshStandardMaterial :color="0xff6622" :roughness="0" :metalness="0" />
        </TresMesh>

        <TresMesh :position="[5, 0.9, -5]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <vertexSnappingMaterial :uSnappingResolution="vertexSnappingState.uSnappingResolution" />
        </TresMesh>

        <Suspense>
            <model :uSnappingResolution="vertexSnappingState.modelSnappingResolution" />
        </Suspense>

        <Suspense>
            <Environment :resolution="256" :blur="1" background>
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[2 * 4 - (3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[-(3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[-1, 0, 0]" :scale="[10, 0.2, 1]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[1, 0, 0]" :scale="[10, 0.2, 1]" />
            </Environment>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import { Pane } from 'tweakpane'
import vertexSnappingMaterial from '../../components/vertexSnappingMaterial/com.vue'
import model from '../../components/vertexSnappingMaterial/model.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x000000,
})

const vertexSnappingState = reactive({
    uSnappingResolution: 3,
    modelSnappingResolution: 6,
})
const paneControl = new Pane()
paneControl.addBinding(vertexSnappingState, 'uSnappingResolution', {
    label: '圆环扭结-分辨率',
    min: 0,
    max: 20,
    step: 0.01,
})
paneControl.addBinding(vertexSnappingState, 'modelSnappingResolution', {
    label: '自行车模型-分辨率',
    min: 0,
    max: 20,
    step: 0.01,
})
</script>

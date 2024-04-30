<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-29 15:38:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-29 17:14:57
-->
<template>
    <loading />
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[5, 2, 10]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="2" />
        <Levioso>
            <TresDirectionalLight ref="dLight" :position="[5, 5, -8]" castShadow :intensity="5" :shadow-mapSize="2048" :shadow-bias="-0.001" />
        </Levioso>
        <Suspense>
            <roomMesh :scale="0.5" :position="[0, -1, 0]" />
        </Suspense>

        <sphere :position="[0, 5, -8]" />
        <sphere :position="[2, 4, -8]" :scale="0.9" />
        <sphere :position="[-2, 2, -8]" :scale="0.8" />

        <Pcss v-bind="pcssConfig" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { ref, watch, reactive } from 'vue'
import { OrbitControls, Levioso } from '@tresjs/cientos'

import roomMesh from '../components/roomup/roomMesh.vue'
import sphere from '../components/roomup/sphere.vue'
import { Pcss } from 'PLS/basic'
import { Pane } from 'tweakpane'

const dLight = ref(null)
watch(dLight, (newVal: any) => {
    if (newVal) {
        newVal.shadow.camera = new THREE.OrthographicCamera(-8.5, 8.5, 8.5, -8.5, 0.1, 20)
    }
})

const tcConfig = {
    clearColor: '#d0d0d0',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
}

const pcssConfig = reactive({
    enabled: true,
    size: 25,
    focus: 0,
    samples: 10,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(pcssConfig, 'enabled', {
    label: '开启PCSS',
})
paneControl.addBinding(pcssConfig, 'size', {
    label: 'size',
    min: 1,
    max: 100,
    step: 1,
})
paneControl.addBinding(pcssConfig, 'focus', {
    label: 'focus',
    min: 0,
    max: 2,
    step: 0.1,
})
paneControl.addBinding(pcssConfig, 'samples', {
    label: 'samples',
    min: 1,
    max: 20,
    step: 1,
})
</script>

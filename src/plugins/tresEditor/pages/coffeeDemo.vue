<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-17 16:22:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-17 16:22:31
-->

<template>
    <loading />
    <TresCanvas v-bind="state">
        <OrbitControls />
        <TresPerspectiveCamera ref="cameraRef" uuid="3c19836b-b3b4-4d47-9a85-07c1c09e93e6" name="Camera" />
        <Suspense>
            <sceneCom />
        </Suspense>
    </TresCanvas>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { reactive, watch, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import sceneCom from '../components/coffee/scene.vue'
import { loading2 as loading } from 'PLS/UIdemo'

const state = reactive({
    clearColor: '#201919',
    windowSize: true,
    antialias: true,
    shadows: true,
    shadowMapType: 1,
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
})

const cameraConfig = {
    metadata: { version: 4.6, type: 'Object', generator: 'Object3D.toJSON' },
    object: {
        type: 'PerspectiveCamera',
        name: 'Camera',
        layers: 1,
        matrix: [
            0.9952879877508126, -3.469446951953614e-18, -0.09696299004743172, 0, -0.04978834565762423, 0.8581028602432903, -0.5110583155364574, 0,
            0.08320421909744286, 0.5134778293580788, 0.8540594690547612, 0, 1.885820123940119, 8.724172264317321, 13.830394181920472, 1,
        ],
        up: [0, 1, 0],
        fov: 45,
        zoom: 1,
        near: 0.1,
        far: 1000,
        focus: 10,
        aspect: 1.24,
        filmGauge: 35,
        filmOffset: 0,
    },
}
const loader = new THREE.ObjectLoader()
const cameraObject = loader.parse(cameraConfig)
const cameraRef = ref(null)
watch(
    () => cameraRef.value,
    (val) => {
        val.copy(cameraObject)
    },
)
</script>

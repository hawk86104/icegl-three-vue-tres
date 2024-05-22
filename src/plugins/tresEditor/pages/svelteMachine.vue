<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-22 08:34:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-22 08:37:34
-->

<template>
    <loading />
    <TresCanvas v-bind="state">
        <OrbitControls />
        <TresPerspectiveCamera ref="cameraRef" uuid="9ca45c84-3c16-48da-b0a2-9e469abea3d1" name="Camera" />
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
import sceneCom from '../components/svelteMachine/scene.vue'
import { loading2 as loading } from 'PLS/UIdemo'

const state = reactive({
    clearColor: '#201919',
    windowSize: true,
    antialias: true,
    shadows: true,
    shadowMapType: 2,
    toneMapping: 3,
    toneMappingExposure: 1.75,
})

const cameraConfig = {
    metadata: { version: 4.6, type: 'Object', generator: 'Object3D.toJSON' },
    object: {
        type: 'PerspectiveCamera',
        name: 'Camera',
        layers: 1,
        matrix: [
            -0.6267758441936044, -2.7755575615628914e-17, 0.7791996157182023, 0, 0.48061725621232265, 0.787112942007701, 0.3866009176850464, 0,
            -0.6133181019392243, 0.6168088978962458, -0.49334337870258826, 0, -80.48773984917322, 89.13969162136891, -91.54490099940386, 1,
        ],
        up: [0, 1, 0],
        fov: 50,
        zoom: 1,
        near: 0.01,
        far: 1000,
        focus: 10,
        aspect: 1.1063238359972203,
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

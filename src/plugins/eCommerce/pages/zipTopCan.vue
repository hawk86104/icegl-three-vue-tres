<!--
 * @Description:  :maxPolarAngle="1"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-30 09:32:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-30 12:18:58
-->

<template>
    <Suspense>
        <loading />
    </Suspense>

    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 0, 16]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls
            enableDamping
            :enablePan="false"
            :enableZoom="false"
            :maxPolarAngle="Math.PI / 1.7"
            :minPolarAngle="Math.PI / 2.4"
            :maxAzimuthAngle="0.1"
            :minAzimuthAngle="-0.1"
        />
        <TresAmbientLight :intensity="0.5" />

        <background />

        <Suspense>
            <model />
        </Suspense>

        <Suspense>
            <Environment files="./plugins/eCommerce/platz.hdr" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { Environment } from 'PLS/basic'
import background from '../components/zipTopCan/background.vue'
import model from '../components/zipTopCan/model.vue'

const tcConfig = {
    clearColor: '#ffffff',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
    outputColorSpace: THREE.SRGBColorSpace,
}
</script>

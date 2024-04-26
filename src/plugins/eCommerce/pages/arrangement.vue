<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:20:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-26 09:34:26
-->

<template>
    <loading />
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[2, 1.6, 6]" :fov="45" :near="0.1" :far="1000" :lookAt="[0, 0, 0]" />
        <OrbitControls enableDamping />

        <Suspense>
            <models />
        </Suspense>

        <env />
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import env from '../components/arrangement/env.vue'
import models from '../components/arrangement/models.vue'

const tcConfig = {
    clearColor: '#fffffff',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
    outputColorSpace: THREE.SRGBColorSpace,
    // disableRender: true
}
</script>

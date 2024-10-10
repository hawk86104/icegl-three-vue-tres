<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 16:08:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 17:44:14
-->
<template>
    <textC />
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 3, 5]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="oc" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[0, 3, -12]" :intensity="1" />

        <fboRender />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import fboRender from '../components/lightNoise/fboRender.vue'
import textC from '../components/lightNoise/text.vue'

const tcConfig = {
    windowSize: true,
    antialias: true,
    renderMode: 'manual',
}

const oc = {
    enableDamping: true,
    minDistance: 5,
    maxDistance: 10,
    minPolarAngle: THREE.MathUtils.DEG2RAD * 60,
    maxPolarAngle: THREE.MathUtils.DEG2RAD * 90,
    makeDefault: true,
}
</script>

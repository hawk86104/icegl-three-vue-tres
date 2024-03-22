<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-01 18:15:26
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1"
            :far="10000" />
        <OrbitControls />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[400, 400, 400]" :intensity="1" color="red" />
        <Suspense>
            <noiseContour />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'

import noiseContour from '../components/noiseContour.vue'

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
};
</script>

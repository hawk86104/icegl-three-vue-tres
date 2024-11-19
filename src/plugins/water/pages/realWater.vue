<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-18 08:56:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-18 12:35:18
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0.426, 0.677, -2.095]" :fov="75" :near="0.01" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <!-- <TresDirectionalLight ref="tdLight" :position="[0.7559289460184544, 0.7559289460184544, -0.3779644730092272]" :intensity="1" /> -->

        <waterSimulation :light="light" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import waterSimulation from '../components/realWater/waterSimulation.vue'

const state = reactive({
    alpha: true,
    antialias: true,
    windowSize: true,
    autoClear: false,
    renderMode: 'manual',
    // clearColor: 0x999999,
})
const light = [0.7559289460184544, 0.7559289460184544, -0.3779644730092272]
</script>

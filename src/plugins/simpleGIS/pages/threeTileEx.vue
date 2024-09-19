<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-05 12:42:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-19 17:34:53
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 12, 0]" :fov="70" :near="0.1" :far="50000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="1" />
        <mapBoxShow />
    </TresCanvas>
    <informationDiv />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import mapBoxShow from '../components/forThreeTile/mapBoxShow.vue'
import informationDiv from '../components/forThreeTile/informationDiv.vue'

const state = reactive({
    clearColor: '#dbf0ff',
    alpha: true,
    antialias: false,
    logarithmicDepthBuffer: true,
    precision: 'highp',
})

const controlsState = reactive({
    enableDamping: true,
    makeDefault: true,
    screenSpacePanning: false,
    minDistance: 0.1,
    maxDistance: 30000,
    maxPolarAngle: 1.2,
    dampingFactor: 0.035,
    keyPanSpeed: 5,
})
</script>

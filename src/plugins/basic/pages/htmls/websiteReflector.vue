<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-27 08:47:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-11 10:44:56
-->
<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'

import { OrbitControls } from '@tresjs/cientos'
import reflectorDUDV from 'PLS/floor/components/reflectorDUDV.vue'
import laptop from '../../components/laptop.vue'

const configState = {
    reflectivity: 3.6,
    showGridHelper: false,
}
//:disableRender="true" renderMode="on-manual"
</script>

<template>
    <Suspense>
        <loading />
    </Suspense>

    <TresCanvas clearColor="#241a1a" window-size>
        <TresPerspectiveCamera :position="[-5, 4, 3]" />
        <OrbitControls />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight
            :intensity="2"
            :position="[2, 3, 0]"
            :cast-shadow="true"
            :shadow-camera-far="50"
            :shadow-camera-left="-10"
            :shadow-camera-right="10"
            :shadow-camera-top="10"
            :shadow-camera-bottom="-10"
        />
        <Suspense>
            <laptop />
        </Suspense>
        <Suspense>
            <reflectorDUDV v-bind="configState" />
        </Suspense>
    </TresCanvas>
</template>

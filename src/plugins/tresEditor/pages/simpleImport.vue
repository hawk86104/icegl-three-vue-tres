<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:11:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-13 08:37:32
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />

        <OrbitControls v-bind="controlsState" />
        <!-- <TresAmbientLight :intensity="0.5" /> -->
        <!-- <TresDirectionalLight ref="TDirectionalLight" :position="[6.058, 5.8, -2]" :intensity="10" color="#ff0000" cast-shadow /> -->

        <Suspense>
            <importJson />
        </Suspense>

        <TresGridHelper />
    </TresCanvas>
    <input id="fileInput" type="file" accept=".zip" style="display: none" />
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, shallowRef, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import importJson from '../components/importJson.vue'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const controlsState = reactive({
    enableDamping: true,
    dampingFactor: 0.05,
})

const TDirectionalLight = shallowRef(null)
watchEffect(() => {
    if (TDirectionalLight.value) {
        //
    }
})
</script>

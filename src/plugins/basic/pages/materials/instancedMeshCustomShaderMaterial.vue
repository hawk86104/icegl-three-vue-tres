<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-24 17:08:56
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-05 17:21:34
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[7, 10, -5.5]" :intensity="5" />

        <Suspense>
            <Environment :intensity="16" :resolution="256" background :blur="0.6">
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[2 * 4 - (3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="2" form="circle" :rotation-x="Math.PI / 2" :position="[-(3 * 4) / 2, 4, 0]" :scale="[1, 5, 0]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[-1, 0, 0]" :scale="[10, 0.2, 1]" />
                <Lightformer :intensity="1" :rotation-y="-Math.PI / 2" :position="[1, 0, 0]" :scale="[10, 0.2, 1]" />
            </Environment>
        </Suspense>

        <instancedMeshCom />
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import instancedMeshCom from '../../components/instancedMeshCom.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x000000,
})
const controlsState = reactive({
    enableDamping: true,
})
</script>

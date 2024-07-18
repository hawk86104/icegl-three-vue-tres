<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-30 14:29:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 09:50:51
-->
<template>
    <TresCanvas v-bind="state" ref="tcRef">
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[10, 8, 4]" :intensity="1" />

        <TresMesh ref="sphereRef" :position="[3, 3, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshToonMaterial color="#006060" />
        </TresMesh>

        <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20, 20]" />
            <TresMeshToonMaterial />
        </TresMesh>

        <TresGridHelper />

        <otherScene />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, watchEffect, ref } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import otherScene from '../../components/otherScene.vue'

const state = reactive({
    clearColor: '#201919',
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
    renderMode: 'manual',
    windowSize: true,
})

const controlsState = reactive({
    enableDamping: true,
    dampingFactor: 0.05,
})

const tcRef = ref()

watchEffect(() => {
    if (tcRef.value) {
        const renderer = tcRef.value.context.renderer.value
        renderer.autoClear = false
    }
})
</script>

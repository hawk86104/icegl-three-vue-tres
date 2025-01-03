<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-30 11:15:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-02 15:42:42
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />

        <TresMesh ref="sphereRef" :position="[0, 6, 0]" cast-shadow>
            <TresSphereGeometry :args="[1.5, 32, 32]" />
            <TresMeshToonMaterial color="#006060" />
        </TresMesh>

        <TresMesh ref="sphereRef2" :position="[4, 6, 0]" cast-shadow>
            <TresSphereGeometry :args="[1.5, 32, 32]" />
            <TresMeshToonMaterial color="#ff6060" />
        </TresMesh>

        <TresMesh ref="planeRef" :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -0.01, 0]" receive-shadow>
            <TresPlaneGeometry :args="[20, 20, 20, 20]" />
            <TresMeshToonMaterial />
        </TresMesh>

        <theBasicCannon v-if="planeRef" :sphere="sphereRef" :sphere2="sphereRef2" :plane="planeRef" />

        <TresDirectionalLight ref="TDirectionalLight" :position="[10, 8, 4]" :intensity="1" cast-shadow />
        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

        <TresGridHelper />
    </TresCanvas>
    <h1 class="text-center text-white w-full absolute">
        使用cannon-es库 API详见:<a target="_black" href="https://pmndrs.github.io/cannon-es/docs/">cannon-es/docs</a>
    </h1>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, shallowRef, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import theBasicCannon from '../components/theBasicCannon.vue'

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
    enableZoom: true,
    autoRotate: false,
})

const sphereRef = ref()
const sphereRef2 = ref()
const planeRef = ref()
const TDirectionalLight = shallowRef()

watchEffect(() => {
    if (TDirectionalLight.value) {
        TDirectionalLight.value.shadow.mapSize.set(1000, 1000)
        TDirectionalLight.value.shadow.camera.near = 0.5
        TDirectionalLight.value.shadow.camera.far = 50000
        TDirectionalLight.value.shadow.camera.top = 20
        TDirectionalLight.value.shadow.camera.right = 20
        TDirectionalLight.value.shadow.camera.left = -20
        TDirectionalLight.value.shadow.camera.bottom = -20
    }
})
</script>

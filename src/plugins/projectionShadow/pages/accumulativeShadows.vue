<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-18 10:22:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-19 09:24:55
-->
<template>
    <TresCanvas v-bind="state" ref="tcRef" window-size>
        <TresPerspectiveCamera :position="[2, 3, 4]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />

        <TresMesh :position="[2, 0.5, -1.5]" receive-shadow cast-shadow name="sphere">
            <TresSphereGeometry :args="[0.5]" />
            <TresMeshStandardMaterial :color="0xffffff * Math.random()" :roughness="0" :metalness="1" />
        </TresMesh>

        <TresMesh :position="[-1.5, 0.5, 1.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[0.5, 0.5, 1]" />
            <TresMeshStandardMaterial :color="0xffffff * Math.random()" :roughness="0.3" :metalness="0" />
        </TresMesh>

        <TresMesh :position="[0, 0.9, 0]" receive-shadow cast-shadow name="torus">
            <TresTorusKnotGeometry :args="[0.5, 0.2, 80, 64]" />
            <TresMeshStandardMaterial :color="0xffffff * Math.random()" :roughness="0.3" :metalness="0" />
        </TresMesh>

        <accumulativeShadowsCom />

        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
        <!-- <TresGridHelper /> -->
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping, Color, EquirectangularReflectionMapping } from 'three'
import { reactive, onMounted, watchEffect, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Environment } from 'PLS/basic'
import accumulativeShadowsCom from '../components/accumulativeShadowsCom.vue'

const state = reactive({
    // clearColor: '#eeeeee',
    alpha: true,
    shadows: true,
    shadowMap: true,
    // shadowMapType: BasicShadowMap,
    // outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    // disableRender: true,
})

const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const tcRef = shallowRef()

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {})
watchEffect(() => {
    if (tcRef.value) {
        const scene = tcRef.value.context.scene.value
        scene.background = new Color('grey')
    }
    // if (tcRef.value?.context?.scene?.value?.environment) {
    //     debugger
    //     tcRef.value.context.scene.value.environment.mapping = EquirectangularReflectionMapping
    // }
})
onMounted(() => {})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-30 08:18:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 11:35:18
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 0, 30]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />

        <Suspense>
            <screen ref="screenRef" />
        </Suspense>

        <TresMesh :position="[0, -5.02, 0]" receiveShadow :rotation="[-Math.PI / 2, 0, 0]">
            <TresPlaneGeometry :args="[50, 50]" />
            <meshReflectionMaterial
                :blur="[300, 50]"
                :resolution="1024"
                :mixBlur="1"
                :mixStrength="100"
                :roughness="1"
                :depthScale="1.2"
                :minDepthThreshold="0.4"
                :maxDepthThreshold="1.4"
                color="#202020"
                :metalness="0.8"
            />
        </TresMesh>

        <effectComposer v-if="tmSceen" :screen="tmSceen" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, onMounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { meshReflectionMaterial } from 'PLS/basic'
import screen from '../components/volumetricLightGodray/screen.vue'
import effectComposer from '../components/volumetricLightGodray/effectComposer.vue'

const state = reactive({
    clearColor: '#050505',
    antialias: false,
    renderMode: 'manual',
})

const controlsState = reactive({
    enableDamping: true,
})

const screenRef = ref(null)
const tmSceen = ref(null)
watch(
    () => screenRef,
    (newValue: any) => {
        nextTick(() => {
            if (newValue && newValue.value.$refs.tmSceen !== undefined) {
                tmSceen.value = newValue.value.$refs.tmSceen
            }
        })
    },
    { deep: true },
)
</script>

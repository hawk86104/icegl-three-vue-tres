<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />

        <Suspense>
            <whiteFloorMesh v-bind="configFloor" :position="[0, -0.1, 0]" />
        </Suspense>

        <causticsTorusMesh />

        <Suspense>
            <skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { skyBoxAmesh as skyBox } from 'PLS/skyBox'
import { whiteFloorMesh } from 'PLS/floor'
import causticsTorusMesh from '../components/causticsTorusMesh.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x999999,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})
const configFloor = reactive({
    size: [60, 60],
    color: '#cbcb96',
    receiveShadow: false,
    edge: 0.35,
})
</script>

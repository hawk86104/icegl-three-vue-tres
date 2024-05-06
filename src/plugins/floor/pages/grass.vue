<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 08:27:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-06 10:50:46
-->
<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[15, 15, 10]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
            <grass />
        </Suspense>
        <Suspense>
            <skyBoxBmesh texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { skyBoxBmesh } from 'PLS/skyBox'
import grass from '../components/grass.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x666666,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})
</script>

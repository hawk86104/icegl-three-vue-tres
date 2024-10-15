<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-15 11:32:57
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[15, 20, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="6.0" />

        <Suspense>
            <imgFloor :position="[2, -2, 2]" v-bind="configState" imgSrcPath="./plugins/floor/image/imgFloor1.png" />
        </Suspense>
        <Suspense>
            <imgFloor :position="[2, 0.1, 2]" v-bind="configState" imgSrcPath="./plugins/floor/image/imgFloor2.png" />
        </Suspense>
        <Suspense>
            <imgFloor :position="[-2, 0, -2]" imgSrcPath="./plugins/floor/image/imgFloor3.png" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -2, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import imgFloor from '../components/imgFloor.vue'

const reflectorState = reactive({
    reflectivity: 2.6,
    showGridHelper: false,
    scale: 4,
})
const configState = reactive({
    color: '#fff',
    opacity: 0.95,
    rotationZ: 0.01,
})

const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', {
    label: '透明度',
    min: 0.0,
    max: 1.0,
    step: 0.01,
})
paneControl.addBinding(configState, 'rotationZ', {
    label: '自转速度',
    min: -0.1,
    max: 0.1,
    step: 0.01,
})
</script>

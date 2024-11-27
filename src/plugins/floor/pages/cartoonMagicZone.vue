<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-06 15:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-27 12:03:06
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="2" />

        <cartoonMagic v-bind="configState" />
        <cartoonMagic color="yellow" :scale="1.0" :position="[3, 0, 0]" />

        <TresMesh :position="[3, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="yellow" />
        </TresMesh>
        <TresMesh :position="[0, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="white" />
        </TresMesh>

        <Suspense>
            <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import cartoonMagic from '../components/cartoonMagic.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: true,
    scale: 1,
})
const configState = reactive({
    color: '#ffffff',
    scale: 1,
})

const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'scale', {
    label: '大小',
    min: 0.1,
    max: 3.0,
    step: 0.1,
})
</script>

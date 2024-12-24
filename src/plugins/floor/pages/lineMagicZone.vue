<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-06 15:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-24 16:40:06
-->
<template>
    <TresCanvas clearColor="#201919" window-size antialias alpha logarithmicDepthBuffer>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="2" />

        <Suspense>
            <lineMagicZone :position="[0, 0, 0]" v-bind="configState" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import lineMagicZone from '../components/lineMagicZone.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: true,
    scale: 1,
})
const configState = reactive({
    color: '#ff0000',
    scale: 1.8,
    height: 2.4,
})

const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'scale', {
    label: '大小',
    min: 0.1,
    max: 3.0,
    step: 0.1,
})
paneControl.addBinding(configState, 'height', {
    label: '高度',
    min: 0.1,
    max: 3.0,
    step: 0.1,
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-06 15:51:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-07 08:28:23
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="6.0" />
        <Suspense>
            <shaderCircleWave v-bind="configState" />
        </Suspense>

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
import shaderCircleWave from '../components/shaderCircleWave.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: false,
    scale: 1,
})
const configState = reactive({
    color: '#ffffff',
    colorDark: '#000000',
    speed: 1,
    scale: 2,
})

const paneControl = new Pane({
    title: 'shaderCircleWave地面',
    expanded: true,
})
paneControl.addBinding(configState, 'color', { label: '圈颜色' })
paneControl.addBinding(configState, 'colorDark', { label: '圈渐变色' })
paneControl.addBinding(configState, 'speed', {
    label: '速度',
    min: 0.1,
    max: 5.0,
    step: 0.1,
})
paneControl.addBinding(configState, 'scale', {
    label: '大小',
    min: 0.1,
    max: 10,
    step: 0.1,
})
</script>

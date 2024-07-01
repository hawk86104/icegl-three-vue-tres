<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-01 09:14:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-01 11:08:34
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[3, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="3" />
        <Suspense>
            <earth />
        </Suspense>
        <Suspense>
            <highlightScan v-bind="configState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import earth from '../components/earth.vue'
import highlightScan from '../components/highlightScan.vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'

const configState = reactive({
    color: '#9affea',
    opacity: 0.58,
    speed: 4.8,
    scale: 1.1,
})
const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', { label: '透明度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(configState, 'speed', { label: '速度', min: 0.1, max: 5, step: 0.1 })
paneControl.addBinding(configState, 'scale', { label: '大小', min: 1.01, max: 2, step: 0.01 })
</script>

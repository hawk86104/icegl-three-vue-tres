<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-18 08:56:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-19 11:25:39
-->
<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[0.426, 0.677, -2.095]" :fov="75" :near="0.01" :far="1000" />
        <OrbitControls />
        <waterSimulation :light="light" ref="waterSimulationRef" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import waterSimulation from '../components/realWater/waterSimulation.vue'

const state = reactive({
    alpha: true,
    antialias: true,
    windowSize: true,
    autoClear: false, // 有些版本 无效 需要自行设置 renderer.value.autoClear = false
    renderMode: 'manual',
})
const light = [0.7559289460184544, 0.7559289460184544, -0.3779644730092272]

const waterSimulationRef = ref(null) as any
const paneControl = new Pane()
paneControl
    .addButton({
        label: '点击按钮',
        title: '随机增加波纹',
    })
    .on('click', () => {
        for (var i = 0; i < 10; i++) {
            waterSimulationRef.value.addDrop(Math.random() * 2 - 1, Math.random() * 2 - 1, 0.03, i & 1 ? 0.02 : -0.02)
        }
    })
const mouseE = ref(false)
paneControl
    .addBinding(mouseE, 'value', {
        label: '鼠标波纹',
    })
    .on('change', (e: any) => {
        waterSimulationRef.value.mouseEvent(e.value)
    })
</script>

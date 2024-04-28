<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-28 15:33:28
-->
<template>
    <pagesShow>
        <template v-slot:ability>
            <TresDirectionalLight :position="[200, 100, 0]" :intensity="1.5" color="#ffffff" />
            <Suspense>
                <cloudsMesh :position="[10, 200, 0]" :scale="20" v-bind="cmConfig" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import pagesShow from '../components/pagesShow.vue'
import cloudsMesh from '../components/weather/cloudsMesh.vue'

const cmConfig = reactive({
    color: '#ffffff',
    segments: 20,
    volume: 6,
    opacity: 1,
    seed: 0,
    fade: 10,
    growth: 4,
    speed: 0,
    bounds: { x: 5, y: 1, z: 1 },
})
const paneControl = new Pane({
    title: '云彩效果',
    expanded: true,
})
paneControl.addBinding(cmConfig, 'color', { label: '颜色' })
paneControl.addBinding(cmConfig, 'seed', {
    label: 'seed',
    min: 0,
    max: 100,
    step: 0.1,
})
paneControl.addBinding(cmConfig, 'segments', {
    label: 'segments',
    min: 1,
    max: 80,
    step: 0.1,
})
paneControl.addBinding(cmConfig, 'volume', {
    label: 'volume',
    min: 0,
    max: 100,
    step: 0.1,
})
paneControl.addBinding(cmConfig, 'opacity', {
    label: 'opacity',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(cmConfig, 'fade', {
    label: 'fade',
    min: 0,
    max: 4000,
    step: 10,
})
paneControl.addBinding(cmConfig, 'growth', {
    label: 'growth',
    min: 0,
    max: 20,
    step: 0.1,
})
paneControl.addBinding(cmConfig, 'speed', {
    label: 'speed',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(cmConfig, 'bounds', {
    x: { min: 0, max: 25 },
    y: { min: 0, max: 25 },
    z: { min: 0, max: 25 },
})
</script>

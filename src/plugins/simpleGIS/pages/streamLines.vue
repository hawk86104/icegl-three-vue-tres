<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-19 14:33:25
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-19 16:56:37
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[25, 25, 25]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping autoRotate />
        <Suspense>
            <streamLine v-bind="configState" />
        </Suspense>

        <Suspense>
            <streamLine :linesList="linePath" :position="[0, 0, -4]" />
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
import { reflectorDUDV } from 'PLS/floor'
import streamLine from '../components/streamLine.vue'
import { getlinePoints } from '../common/utils'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: false,
    scale: 5,
})
const configState = reactive({
    color: '#bd01ff',
    radius: 0.2,
    speed: 1,
    tubularSegments: 64,
    radialSegments: 6,
    closed: false,
    clockwise: false,
    fewNum: 1,
    linesList: [
        [15, 0, 15],
        [15, 0, -15],
        [-15, 0, -15],
        [-15, 0, 10],
        [13, 0, 15],
    ],
})

const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '流光颜色' })
paneControl.addBinding(configState, 'radius', {
    label: '管道半径',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(configState, 'speed', {
    label: '跑动速度',
    min: 0.1,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(configState, 'tubularSegments', {
    label: '管道路径平滑',
    min: 1,
    max: 100,
    step: 1,
})
paneControl.addBinding(configState, 'radialSegments', {
    label: '管道壁圆润',
    min: 1,
    max: 20,
    step: 1,
})
paneControl.addBinding(configState, 'closed', { label: '闭合管道' })
paneControl.addBinding(configState, 'clockwise', { label: '顺时针流动' })
paneControl.addBinding(configState, 'fewNum', {
    label: '流线数量',
    min: 1,
    max: 10,
    step: 1,
})

const linePath = await getlinePoints('./plugins/simpleGIS/json/320000_full.json')
</script>

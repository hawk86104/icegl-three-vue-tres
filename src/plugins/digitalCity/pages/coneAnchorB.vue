<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-26 10:13:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-19 20:19:44
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <Suspense>
                <coneAnchorMeshB :position="[60, 19, 0]" :scale="6" v-bind="configState" />
            </Suspense>

						<Suspense>
                <coneAnchorMeshB :position="[319, 19, 119]" :scale="3" anchorColor="#ffffff" floorColor="#ffffff" :depthTest="false" />
            </Suspense>

						<Suspense>
                <coneAnchorMeshB :position="[-319, 19, 619]" :scale="5" anchorColor="#ff0000" floorColor="#ffff00" />
            </Suspense>

						<Suspense>
                <coneAnchorMeshB :position="[-319, 19, -619]" :scale="8" anchorColor="#ffff00" floorColor="#ffff00" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { coneAnchorMeshB } from 'PLS/digitalCity'
import pagesShow from '../components/pagesShow.vue'

const paneControl = new Pane({
    expanded: true,
})
const configState = reactive({
    anchorColor: '#0059ff',
    rotateSpeed: 0.05,
    floorSize: 12,
    floorColor: '#0059ff',
    floorSpeed: 0.6,
    depthTest: true,
})
paneControl.addBinding(configState, 'anchorColor', { label: '浮标颜色' })
paneControl.addBinding(configState, 'rotateSpeed', { label: '旋转速度', min: -0.2, max: 0.2, step: 0.001 })

paneControl.addBinding(configState, 'floorColor', { label: '波浪颜色' })
paneControl.addBinding(configState, 'floorSize', { label: '波浪大小', min: 0.1, max: 20, step: 0.1 })
paneControl.addBinding(configState, 'floorSpeed', { label: '波浪速度', min: -2, max: 3, step: 0.1 })

paneControl.addBinding(configState, 'depthTest', { label: '是否遮挡' })
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-26 10:13:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-19 19:04:55
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <Suspense>
                <coneAnchorMeshA :position="[0, 19, 0]" v-bind="configState" :scale="6" />
            </Suspense>
            <Suspense>
                <coneAnchorMeshA :position="[319, 19, 119]" color="#2cff00" :height="60" :speed="0.1" :scale="2" />
            </Suspense>
            <Suspense>
                <coneAnchorMeshA :position="[-319, 19, 619]" color="#ffd900" :height="30" :speed="0.02" :scale="1.5" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { coneAnchorMeshA } from 'PLS/digitalCity'
import pagesShow from '../components/pagesShow.vue'

const paneControl = new Pane({
    title: '旋转椎体-参数',
    expanded: true,
})
const configState = reactive({
    height: 40,
    color: '#00dfff',
    occlusion: true,
    speed: 0.05,
})
paneControl.addBinding(configState, 'height', {
    label: '高度',
    min: 1,
    max: 100,
    step: 1,
})
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'occlusion', { label: '全局遮挡' })
paneControl.addBinding(configState, 'speed', { label: '旋转速度', min: 0.01, max: 0.3, step: 0.01 })
</script>

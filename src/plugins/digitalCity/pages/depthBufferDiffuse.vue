<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-12 16:17:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:26:53
-->
<template>
    <loading></loading>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <depthBufferDiffuse :position="[0, 30, 0]" v-bind="cmConfig" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { defaultLoading as loading } from 'PLS/UIdemo'
import { depthBufferDiffuse } from 'PLS/digitalCity'
import { Pane } from 'tweakpane'
import { reactive, shallowRef, watchEffect } from 'vue'
import pagesShow from '../components/pagesShow.vue'

const cmConfig = reactive({
    shieldColor: '#ffff00',
    rimColor: '#ffffff',
    threshold: 0.005,
    radius: 100,
})
const paneControl = new Pane()
paneControl.addBinding(cmConfig, 'shieldColor', { label: '圈颜色' })
paneControl.addBinding(cmConfig, 'rimColor', { label: '条颜色' })
paneControl.addBinding(cmConfig, 'threshold', { label: '线条参数', min: 0.00001, max: 0.01, step: 0.00001 })
paneControl.addBinding(cmConfig, 'radius', { label: '大小', min: 10, max: 200, step: 1 })

const pagesShowRef = shallowRef(null)
watchEffect(() => {
    if (pagesShowRef.value) {
        if (pagesShowRef.value.$refs.tcRef) {
            pagesShowRef.value.$refs.tcRef.context.camera.value.position.set(-135, 250, 320)
        } else {
            if (pagesShowRef.value.$refs.perspectiveCameraRef) {
                pagesShowRef.value.$refs.perspectiveCameraRef.position.set(-135, 250, 320)
            }
        }
    }
})
</script>

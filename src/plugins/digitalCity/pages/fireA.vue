<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:26:44
-->
<template>
    <loading></loading>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <Suspense>
                <fireA v-bind="fireAState" :position="[200, 19, 120]" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { Pane } from 'tweakpane'
import { ref, reactive, watchEffect } from 'vue'
import loading from 'PLS/UIdemo/components/loading/default.vue'
import pagesShow from '../components/pagesShow.vue'
import fireA from '../components/fire/fireA.vue'

const paneControl = new Pane({
    title: '火-参数',
    expanded: true,
})
const fireAState = reactive({
    fireScale: 60,
    magnitude: 1.3,
    lacunarity: 2.0,
    gain: 1.0,
})
paneControl.addBinding(fireAState, 'fireScale', {
    label: '大小',
    min: 10,
    max: 300,
    step: 10,
})
paneControl.addBinding(fireAState, 'magnitude', {
    label: 'magnitude',
    min: 0.05,
    max: 3,
    step: 0.05,
})
paneControl.addBinding(fireAState, 'lacunarity', {
    label: 'lacunarity',
    min: 0.1,
    max: 10,
    step: 0.2,
})
paneControl.addBinding(fireAState, 'gain', {
    label: 'gain',
    min: 0.1,
    max: 2.0,
    step: 0.1,
})

const pagesShowRef = ref()
watchEffect(() => {
    if (pagesShowRef.value) {
        if (pagesShowRef.value.$refs.tcRef) {
            pagesShowRef.value.$refs.tcRef.context.camera.value.position.set(580, 360, 500)
        } else {
            if (pagesShowRef.value.$refs.perspectiveCameraRef) {
                pagesShowRef.value.$refs.perspectiveCameraRef.position.set(580, 360, 500)
            }
        }
    }
})
</script>

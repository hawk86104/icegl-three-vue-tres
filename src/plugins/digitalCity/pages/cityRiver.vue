<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 11:20:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:25:50
-->
<template>
    <pagesShow ref="pagesShowRef" :showAxesHelper="false" :showGridHelper="false" :showBuildings="false" :autoRotate="false">
        <template v-slot:ability>
            <Suspense>
                <cityRiver />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import pagesShow from '../components/pagesShow.vue'
import cityRiver from '../components/cityRiver/index.vue'


const pagesShowRef = shallowRef(null)
watchEffect(() => {
    if (pagesShowRef.value) {
        if (pagesShowRef.value.$refs.tcRef) {
            pagesShowRef.value.$refs.tcRef.context.camera.value.position.set(4.0, 2.15, 3.6)
        } else {
            if (pagesShowRef.value.$refs.perspectiveCameraRef) {
                pagesShowRef.value.$refs.perspectiveCameraRef.position.set(4.0, 2.15, 3.6)
            }
        }
    }
    // pagesShowRef.value.$refs.perspectiveCameraRef.lookAt(0, 0, -2)
})

const { onLoop } = useRenderLoop()
onLoop(() => {
    if (pagesShowRef.value) {
        // console.log(pagesShowRef.value.$refs.perspectiveCameraRef)
    }
})
</script>

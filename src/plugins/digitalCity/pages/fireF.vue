<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-03 15:24:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:24:11
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <fireF :position="[0, 20, 10]" :scale="40" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import fireF from '../components/fire/fireF.vue'

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

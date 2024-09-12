<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 15:02:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 10:24:41
-->

<template>
    <TresCanvas ref="tcRef" renderMode="manual" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <TresGridHelper :args="[10, 10]" />
        <!-- 这种方式存在bug：无论相机在哪个角度，都看到正常方块绘制在发光方块之上 -->
        <ecLayers />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { watchEffect, ref } from 'vue'
import ecLayers from '../../components/ecLayers.vue'

const tcRef = ref()
watchEffect(() => {
    if (tcRef.value) {
        const renderer = tcRef.value.context.renderer.value
        renderer.autoClear = false
    }
})
</script>

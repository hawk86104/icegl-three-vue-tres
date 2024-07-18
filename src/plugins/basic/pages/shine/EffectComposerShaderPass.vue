<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 15:02:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:38:20
-->

<template>
    <TresCanvas renderMode="manual" window-size ref="tcRef">
        <TresPerspectiveCamera :position="[10, 10, 10]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <TresGridHelper :args="[10, 10]" />
        <ecLayerShaderPass />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import ecLayerShaderPass from '../../components/ecLayerShaderPass.vue'
import { watchEffect, ref } from 'vue'

const tcRef = ref()
watchEffect(() => {
    if (tcRef.value) {
        let renderer = tcRef.value.context.renderer.value
        renderer.autoClear = false
    }
})
</script>

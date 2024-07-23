<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-23 15:11:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-23 15:26:59
-->

<template>
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 2.5, 8]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls enableDamping autoRotate :autoRotateSpeed="0.5" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[1, 1, 1]" :intensity="1" />

        <windLineMesh />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import windLineMesh from '../components/windLineMesh.vue'

const tcConfig = {
    clearColor: 'deepskyblue',
    windowSize: true,
    antialias: true,
}
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 15:02:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:35:54
-->

<template>
    <TresCanvas renderMode="manual" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <TresGridHelper :args="[10, 10]" />
        <bloomPass />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import bloomPass from '../../components/bloomPass.vue'
</script>

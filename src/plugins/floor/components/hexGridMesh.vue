<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 15:55:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-26 16:54:48
-->
<template>
    <TresMesh>
        <TresSphereGeometry :args="[1, 48, 24]" />
        <hexGridMaterial />
    </TresMesh>
</template>
<script setup lang="ts">
import hexGridMaterial from './hexGridMaterial.vue'
</script>

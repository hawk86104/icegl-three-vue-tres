<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 15:55:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-27 11:32:04
-->
<template>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
        <TresPlaneGeometry :args="[1, 1]" />
        <hexGridMaterial :baseMaterial="baseMaterial" v-bind="$attrs" />
    </TresMesh>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import hexGridMaterial from './hexGridMaterial.vue'

const baseMaterial = new THREE.MeshBasicMaterial() // MeshBasicMaterial  MeshPhongMaterial
</script>

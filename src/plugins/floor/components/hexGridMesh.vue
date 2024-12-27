<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 15:55:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-27 11:03:47
-->
<template>
    <TresMesh>
        <TresSphereGeometry :args="[1, 48, 24]" />
        <hexGridMaterial :baseMaterial="baseMaterial" v-bind="$attrs" />
    </TresMesh>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import hexGridMaterial from './hexGridMaterial.vue'

const baseMaterial = new THREE.MeshPhongMaterial() // MeshBasicMaterial  MeshPhongMaterial

</script>

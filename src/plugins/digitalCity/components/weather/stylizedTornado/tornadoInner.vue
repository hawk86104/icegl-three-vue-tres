<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 10:17:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-15 10:29:00
-->
<template>
    <TresMesh :geometry="nodes.tornado.geometry">
        <meshTornadoMaterial colorBase="#ff5400" :colorIntensity="8" :radialShearAmount="new THREE.Vector2(0.7, 0.7)" :alphaThreshold="0.17" :showEdge="true" />
    </TresMesh>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { Resource } from 'PLS/resourceManager'
import meshTornadoMaterial from './materials/meshTornadoMaterial.vue'

const { nodes } = Resource.getItem('tornado.glb')
</script>

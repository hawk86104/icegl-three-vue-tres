<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 10:17:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-15 10:44:59
-->
<template>
    <TresMesh :geometry="nodes.tornado.geometry">
        <meshTornadoMaterial
            :colorBase="color"
            :colorIntensity="13"
            :twirlAmount="8"
            :radialShearAmount="new THREE.Vector2(0.7, 0.7)"
            :twirlCenter="new THREE.Vector2(0.5, -0.52)"
            :twirlOffset="new THREE.Vector2(-1, -0.5)"
            :radialOffset="new THREE.Vector2(-1, 0.5)"
            :alphaThreshold="0.23"
            :showEdge="false"
        />
    </TresMesh>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { Resource } from 'PLS/resourceManager'
import meshTornadoMaterial from './materials/meshTornadoMaterial.vue'

const { nodes } = Resource.getItem('tornado.glb')
const props = withDefaults(
    defineProps<{
        color?: string
    }>(),
    {
        color: '#ff5400',
    },
)
</script>

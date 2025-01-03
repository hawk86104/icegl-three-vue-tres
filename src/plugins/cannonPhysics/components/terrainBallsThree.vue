<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-02 14:09:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-03 08:38:28
-->
<template>
    <TresGroup ref="sphereGroupRef">
        <template v-for="i in 10" :key="i">
            <TresMesh v-for="j in 10" :key="j" :position="[i * 10 - 55, 26, j * 10 - 55]" cast-shadow>
                <TresSphereGeometry :args="[0.6, 16, 16]" />
                <TresMeshStandardMaterial color="#ffffff" />
            </TresMesh>
        </template>
    </TresGroup>
    <TresMesh ref="planeRef" :geometry="planeGeometry" :rotation-x="-Math.PI / 2" receive-shadow>
        <TresMeshPhysicalMaterial :roughness="1" :metalness="0" color="gray" :side="THREE.DoubleSide"/>
    </TresMesh>

    <terrainBallsCannon v-if="planeRef" :sphereGroup="sphereGroupRef" :plane="planeRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'
import terrainBallsCannon from './terrainBallsCannon.vue'

const sphereGroupRef = ref()
const planeRef = ref()

const noise2D = createNoise2D()
const elevation = (x: number, y: number) => {
    var major = 0.8 * 4 * noise2D(0.1 * x, 0.1 * y),
        minor = 0.2 * noise2D(0.3 * x, 0.3 * y)
    return (major + minor) * 1.2
}
const planeGeometry = new THREE.PlaneGeometry(100, 100, 49, 49)
const pos = planeGeometry.getAttribute('position')
for (var i = 0; i < pos.count; i++) pos.setZ(i, elevation(pos.getX(i), pos.getY(i)))
planeGeometry.computeBoundingSphere()
planeGeometry.computeVertexNormals()

console.log(planeGeometry)
</script>

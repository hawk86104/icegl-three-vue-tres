<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 16:35:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-09 14:39:25
-->
<template>
    <primitive :object="meshMerged" cast-shadow receive-shadow :position="[-33, 0, 7]" :scale="[0.7, 1.2, 0.7]" name="实验楼" :rotation-y="Math.PI / 2" />
    <TresMesh
        ref="tooltipRef"
        :scale="[0.03, 0.02, 0.004]"
        :rotation="[0, Math.PI / 2, 0]"
        :position="[-32, 27, 12]"
        :geometry="tooltips.getObjectByName('Arctic_Tooltip_lambert4_0').geometry"
        :material="tooltipMaterial"
    >
        <Html :center="true" transform>
            <h1 class="text-xs p-0.5 rounded -mt-10 text-white font-bold" style="font-size: 78rem; width: 4em; text-align: center; margin-top: 1em">实验楼</h1>
        </Html>
    </TresMesh>
</template>
<script setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF, Html } from '@tresjs/cientos'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { gsap } from 'gsap'
import { ref, watchEffect } from 'vue'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/laboratoryBuild.gltf', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()

const geometryArr = []
const materialArr = []
model.traverse((child) => {
    child.updateMatrixWorld(true)
    if (child.isMesh) {
        child.geometry.applyMatrix4(child.matrixWorld)
        geometryArr.push(child.geometry)

        // child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 0.1
        child.material.envmap = scene.value.background
        materialArr.push(child.material)
    }
})
const geometryMerged = BufferGeometryUtils.mergeGeometries(geometryArr, true)
const meshMerged = new THREE.Mesh(geometryMerged, materialArr)

const { scene: tooltips } = await useGLTF('./plugins/digitalPark/model/arctic_tooltip.glb', {
    draco: true,
    decoderPath: './draco/',
})

const tooltipMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.3,
    metalness: 0.05,
    color: '#b07560',
    envMapIntensity: 0.75,
    clearcoatRoughness: 0,
    clearcoat: 1,
})

const tooltipRef = ref(null)
watchEffect(() => {
    if (tooltipRef.value) {
        gsap.to(tooltipRef.value.rotation, {
            y: Math.PI * 2.5,
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
        })
    }
})
</script>

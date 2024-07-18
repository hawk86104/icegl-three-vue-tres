<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-27 10:38:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 16:55:49
-->
<template>
    <primitive :object="scene" ref="tresMesh" />
    <reflectorMipMap ref="reflectorMipMapRef" :parent="floor" :ignoreObjects="[light, floor]" />
</template>

<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
import { flatModel } from './utils'
import { defineExpose, ref, watch } from 'vue'
import { makeCustomShaderMaterial } from 'PLS/floor/common/reflectorCustomMaterial'
import { reflectorMipMap } from 'PLS/floor'

const props = withDefaults(
    defineProps<{
        hide?: boolean
    }>(),
    {
        hide: false,
    },
)

const { scene } = await useGLTF('./plugins/industry4/model/su7_car/su7_startroom.raw.glb', { draco: true, decoderPath: './draco/' })

const pTexture = await useTexture([
    './plugins/industry4/texture/t_startroom_light.raw.jpg',
    './plugins/industry4/texture/t_startroom_ao.raw.jpg',
    './plugins/industry4/texture/t_floor_roughness.webp',
    './plugins/industry4/texture/t_floor_normal.webp',
])
pTexture[2].colorSpace = THREE.LinearSRGBColorSpace
pTexture[2].wrapS = pTexture[2].wrapT = THREE.RepeatWrapping
pTexture[3].colorSpace = THREE.LinearSRGBColorSpace
pTexture[3].wrapS = pTexture[3].wrapT = THREE.RepeatWrapping
pTexture[1].flipY = false
pTexture[1].channel = 1
pTexture[1].flipY = false
pTexture[1].colorSpace = THREE.LinearSRGBColorSpace
pTexture[0].channel = 1
pTexture[0].flipY = false
pTexture[0].colorSpace = THREE.SRGBColorSpace

const roomModel = flatModel(scene)
const light = roomModel[1] as THREE.Mesh
const lightMat = light.material as THREE.MeshPhysicalMaterial
lightMat.emissive = new THREE.Color('white')
lightMat.emissiveIntensity = 1
lightMat.toneMapped = false
lightMat.transparent = true
lightMat.alphaTest = 0.01
light.name = 'lightTop'
// light.visible = false

const floor = roomModel[2] as THREE.Mesh
const floorMat = floor.material as THREE.MeshPhysicalMaterial
floorMat.roughnessMap = pTexture[2]
floorMat.normalMap = pTexture[3]
floorMat.aoMap = pTexture[1]
floorMat.lightMap = pTexture[0]

floorMat.envMap = pTexture[2]
floorMat.envMapIntensity = 0

floorMat.transparent = true

floor.name = 'floorBtm'
// floor.visible = false

const reflectorMipMapRef = ref(null)
watch(
    () => reflectorMipMapRef,
    (newVal) => {
        floor.material = makeCustomShaderMaterial(floor, newVal.value) as any
    },
    { deep: true },
)

watch(
    () => props.hide,
    (newVal) => {
        if (newVal) {
            floor.material.envMap = null
            floor.material.envMapIntensity = 1
            floor.material.opacity = 0
            lightMat.opacity = 0
        } else {
            floor.material.envMap = pTexture[2]
            floor.material.envMapIntensity = 0
            lightMat.opacity = 1
        }
    },
)

const tresMesh = ref<THREE.Mesh>()
defineExpose({
    meshList: [light, floor],
    tresMesh,
})
</script>

<template>
    <TresMesh ref="tmSceen" :position="[0, 0, -16]">
        <TresPlaneGeometry :args="[16, 10]" />
        <TresMeshBasicMaterial :map="texture" />
        <TresMesh :scale="[16.05, 10.05, 1]" :position="[0, 0, -0.01]">
            <TresPlaneGeometry />
            <TresMeshBasicMaterial color="black" />
        </TresMesh>
    </TresMesh>

    <CubeCamera ref="cubeCameraRef" :position="[-3, -1, -5]" :resolution="256">
        <TresMesh>
            <TresSphereGeometry :args="[2, 32, 32]" />
            <TresMeshStandardMaterial :metalness="1" :roughness="0.1" :envMap="envMap" />
        </TresMesh>
    </CubeCamera>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useVideoTexture } from '@tresjs/cientos'
import { CubeCamera } from 'PLS/basic'

const texture = ref()
texture.value = await useVideoTexture('./plugins/visualArts/video/vlg.mp4', { loop: true })
texture.value.colorSpace = THREE.SRGBColorSpace

const cubeCameraRef = ref()
const envMap = ref()
watch(cubeCameraRef, (value) => {
    envMap.value = value.texture
})
const tmSceen = ref()
</script>

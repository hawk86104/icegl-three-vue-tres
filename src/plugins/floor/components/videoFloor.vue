<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-12 10:34:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-25 12:36:09
-->
<template>
    <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="props.size" />
        <TresMeshStandardMaterial v-bind="tmsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watch, reactive, ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
const tmRef = ref()
const { onLoop } = useRenderLoop()
onLoop(() => {
    if (tmRef.value) {
        tmRef.value.rotation.z += props.rotationZ
    }
})

const props = withDefaults(
    defineProps<{
        size?: Array<number>
        vSrcPath: string
        loop?: boolean
        color?: string
        opacity?: number
        rotationZ?: number
        textureRepeat?: Array<number>
    }>(),
    {
        size: [10, 10],
        loop: true,
        color: '#fff',
        opacity: 0.95,
        rotationZ: 0.01,
        textureRepeat: [1, 1],
    },
)

let video = document.createElement('video')
video.src = props.vSrcPath
video.loop = props.loop
video.muted = true
video.crossOrigin = ''
video.play()
let videoTexture = new THREE.VideoTexture(video)
videoTexture.wrapS = THREE.RepeatWrapping
videoTexture.wrapT = THREE.RepeatWrapping
videoTexture.repeat.set(props.textureRepeat[0], props.textureRepeat[1])

const tmsMaterial = reactive({
    color: props.color,
    alphaMap: videoTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: props.opacity,
    blending: THREE.AdditiveBlending,
    flatShading: true,
    depthTest: true,
    depthWrite: true,
})
watch(
    () => props.color,
    (newVal) => {
        tmsMaterial.color = new THREE.Color(newVal)
    },
)
watch(
    () => props.opacity,
    (newVal) => {
        tmsMaterial.opacity = newVal
    },
)
</script>

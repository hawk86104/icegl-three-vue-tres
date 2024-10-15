<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-12 17:42:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-15 11:32:36
-->
<template>
    <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="props.size" />
        <TresMeshBasicMaterial v-bind="tmsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watch, reactive, ref } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
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
        imgSrcPath: string
        color?: string
        opacity?: number
        rotationZ?: number
        textureRepeat?: Array<number>
    }>(),
    {
        size: [10, 10],
        color: '#fff',
        opacity: 0.95,
        rotationZ: 0.01,
        textureRepeat: [1, 1],
    },
)

const pTexture = await useTexture([props.imgSrcPath])
pTexture.colorSpace = THREE.SRGBColorSpace
pTexture.wrapS = THREE.RepeatWrapping
pTexture.wrapT = THREE.RepeatWrapping
pTexture.repeat.set(props.textureRepeat[0], props.textureRepeat[1])

const tmsMaterial = reactive({
    color: props.color,
    map: pTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: props.opacity,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
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

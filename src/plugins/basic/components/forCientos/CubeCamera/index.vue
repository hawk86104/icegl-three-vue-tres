<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-30 10:04:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-30 10:40:39
-->
<template>
    <TresGroup>
        <primitive :object="camera" />
        <TresGroup ref="rgRef"> <slot /> </TresGroup>
    </TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { useCubeCamera } from './useCubeCamera.ts'
import { ref, defineExpose } from 'vue'
const props = withDefaults(
    defineProps<{
        resolution?: number
        near?: number
        far?: number
        envMap?: THREE.Texture
        fog?: THREE.Fog | THREE.FogExp2
        frames?: number
    }>(),
    {
        resolution: 256,
        near: 0.1,
        far: 1000,
        envMap: null,
        fog: null,
        frames: Infinity,
    },
)
const { fbo, camera, update } = useCubeCamera({
    resolution: props.resolution,
    near: props.near,
    far: props.far,
    envMap: props.envMap,
    fog: props.fog,
})

const { onBeforeLoop } = useRenderLoop()
let count = 0
const rgRef = ref(null)
onBeforeLoop(() => {
    if (rgRef.value && (props.frames === Infinity || count < props.frames)) {
        rgRef.value.visible = false
        update()
        rgRef.value.visible = true
        count++
    }
})
defineExpose({
    texture: fbo.value?.texture,
})
</script>

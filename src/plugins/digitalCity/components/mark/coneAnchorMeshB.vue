<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-08-19 19:07:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-19 20:12:32
-->
<template>
    <TresGroup :rotateX="-Math.PI / 2" ref="coneGroup">
        <primitive :object="scene" />
        <TresMesh :renderOrder="999999">
            <TresCircleGeometry :args="[floorSize, 32]" />
            <TresMeshStandardMaterial
                :color="floorColor"
                :metalness="0.0"
                :roughness="0.6"
                transparent
                :opacity="0.8"
                :depthTest="props.depthTest"
                :depthWrite="false"
                :map="pTexture"
            />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const props = withDefaults(
    defineProps<{
        anchorColor?: string
        rotateSpeed?: number
        depthTest?: boolean
        floorSize?: number
        floorColor?: string
        floorSpeed?: number
    }>(),
    {
        anchorColor: '#b0ffff',
        rotateSpeed: 0.05,
        floorSize: 12,
        floorColor: '#b0ffff',
        floorSpeed: 0.6,
        depthTest: true,
    },
)

const { scene, materials } = await useGLTF('./plugins/digitalCity/model/coneAnchorB.glb', { draco: true, decoderPath: './draco/' })
materials[''].color.set(props.anchorColor)
materials[''].metalness = 0.0
materials[''].roughness = 0.5
materials[''].transparent = true
materials[''].opacity = 1
materials[''].depthTest = props.depthTest
scene.children[0].renderOrder = 999999

const { map: pTexture } = await useTexture({
    map: './plugins/digitalCity/image/waveCircle.png',
})
const { width, height } = pTexture.image
pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping
pTexture.repeat.set(1 / (width / height), 1)

watch(
    () => [props.anchorColor, props.depthTest],
    ([color, depthTest]) => {
        materials[''].color.set(color)
        materials[''].depthTest = depthTest
    },
)

const coneGroup = ref(null) as any
const { onLoop } = useRenderLoop()
let _offset = 0
onLoop(() => {
    coneGroup.value?.children[0].rotateZ(props.rotateSpeed)
    if (pTexture) {
        _offset += props.floorSpeed
        pTexture.offset.x = Math.floor(_offset) / (pTexture.image.width / pTexture.image.height)
    }
})
</script>

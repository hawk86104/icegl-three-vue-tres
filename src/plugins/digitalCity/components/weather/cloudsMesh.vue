<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-28 15:48:30
-->
<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { useTexture, useRenderLoop, useTresContext } from '@tresjs/core'
import { Clouds, Cloud } from '@pmndrs/vanilla'
import * as THREE from 'three'

const props = withDefaults(
    defineProps<{
        color?: string
        segments?: number
        volume?: number
        opacity?: number
        seed?: number
        fade?: number
        growth?: number
        speed?: number
        bounds?: {
            x: number
            y: number
            z: number
        }
    }>(),
    {
        color: '#ffffff',
        segments: 20,
        volume: 6,
        opacity: 1.0,
        seed: 0,
        fade: 10,
        growth: 4,
        speed: 0,
        bounds: {
            x: 5,
            y: 1,
            z: 1,
        },
    },
)

//@ts-ignore
const map = await useTexture(['./plugins/digitalCity/image/cloud.png'])

const clouds = new Clouds({ texture: map })

const cloud0 = new Cloud({ color: new THREE.Color(props.color) })
clouds.add(cloud0)

const cloud1 = new Cloud({ color: new THREE.Color('pink') })
cloud1.position.set(20, 0, 10)
clouds.add(cloud1)

const { camera } = useTresContext()
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta, elapsed }) => {
    clouds.update(camera.value, elapsed, delta)
})
watch(
    () => props.color,
    (value) => {
        cloud0.color.set(value)
    },
)
watchEffect(() => {
    if (props.segments) {
        cloud0.segments = props.segments
    }
    if (props.volume) {
        cloud0.volume = props.volume
    }
    if (props.opacity) {
        cloud0.opacity = props.opacity
    }
    if (props.seed) {
        cloud0.seed = props.seed
    }
    if (props.fade) {
        cloud0.fade = props.fade
    }
    if (props.growth) {
        cloud0.growth = props.growth
    }
    if (props.speed) {
        cloud0.speed = props.speed
    }
    if (props.bounds) {
        cloud0.bounds.x = props.bounds.x
        cloud0.bounds.y = props.bounds.y
        cloud0.bounds.z = props.bounds.z
    }
    cloud0.updateCloud()
})
</script>

<template>
    <primitive :object="clouds" :renderOrder="3000" />
</template>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 09:56:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-22 15:28:13
-->
<template>
    <primitive :object="caustics.group" :position="[0, 0.003, 0]" />
    <primitive :object="caustics.helper" :visible="false" />
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, watchEffect, watch } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Caustics } from '@pmndrs/vanilla'

const props = withDefaults(
    defineProps<{
        color?: string
        ior?: number
        backsideIOR?: number
        far?: number
        worldRadius?: number
        intensity?: number
        causticsOnly?: boolean
        lightSource?: any
    }>(),
    {
        color: '#ffffff',
        ior: 1.1,
        backsideIOR: 1.1,
        far: 15,
        worldRadius: 0.3,
        intensity: 0.05,
        causticsOnly: false,
        lightSource: { x: 1, y: 1, z: 1 },
    },
)

const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 32)
const mat = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0,
})
mat.color.setHSL(Math.random(), 1, 0.5)
mat.thickness = 2
const torusMesh = new THREE.Mesh(geometry, mat)
torusMesh.position.set(0, 6, 0)

const { renderer } = useTresContext()
const caustics = Caustics(renderer.value, { frames: Infinity, resolution: 1024, worldRadius: props.worldRadius })
caustics.params.backside = true
caustics.scene.add(torusMesh)

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ elapsed }) => {
    torusMesh.rotation.x = elapsed
    torusMesh.rotation.y = elapsed
    caustics.update()
})

watchEffect(() => {
    if (props.color) {
        caustics.params.color.set(props.color)
    }
    if (props.ior) {
        caustics.params.ior = props.ior
    }
    if (props.backsideIOR) {
        caustics.params.backsideIOR = props.backsideIOR
    }
    if (props.far) {
        caustics.params.far = props.far
    }
    if (props.worldRadius) {
        caustics.params.worldRadius = props.worldRadius
    }
    if (props.intensity) {
        caustics.params.intensity = props.intensity
    }
})
watch(
    () => props.causticsOnly,
    (value) => {
        caustics.params.causticsOnly = value
    },
)
watch(
    () => props.lightSource,
    (value) => {
        if (value) {
            if (caustics.params.lightSource instanceof THREE.Vector3) {
                caustics.params.lightSource.set(value.x, value.y, value.z)
            }
        }
    },
    { deep: true },
)
</script>

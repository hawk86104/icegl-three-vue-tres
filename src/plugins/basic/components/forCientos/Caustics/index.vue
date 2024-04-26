<script setup lang="ts">
import { shallowRef, watch, watchEffect } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Caustics } from '@pmndrs/vanilla'
import * as THREE from 'three'

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
        resolution?: number
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
        resolution: 1024,
    },
)

const { renderer } = useTresContext()
const caustics = Caustics(renderer.value, { frames: Infinity, resolution: props.resolution, worldRadius: props.worldRadius })
caustics.params.backside = true

const group = shallowRef(null)
watch(group, (newVal) => {
    if (newVal) {
        caustics.scene.add(newVal)
    }
})
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ elapsed }) => {
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

<template>
    <TresGroup ref="group">
        <slot />
    </TresGroup>
    <primitive :object="caustics.group" :position="[0, 0.003, 0]" />
    <primitive :object="caustics.helper" :visible="false" />
</template>

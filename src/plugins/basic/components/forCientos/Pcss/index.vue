<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-29 16:47:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-29 17:28:16
-->
<template></template>
<script lang="ts" setup>
import { defineProps, withDefaults, watch } from 'vue'
import { Mesh } from 'three'
import { useTresContext } from '@tresjs/core'
import { pcss } from './index.ts'

const props = withDefaults(
    defineProps<{
        enabled?: boolean
        size?: number
        focus?: number
        samples?: any
    }>(),
    {
        enabled: true,
        size: 25,
        focus: 0,
        samples: 10,
    },
)

const { camera, renderer, scene } = useTresContext()
let reset = null as any

const updatePCSS = (args: { enabled: boolean; size: number; focus: number; samples: number }) => {
    const { enabled, size, focus, samples } = args

    if (reset) {
        reset(renderer.value, scene.value, camera.value)
        reset = null
    }

    if (enabled) {
        reset = pcss({ focus, size, samples })

        scene.value.traverse((object) => {
            if (object instanceof Mesh) {
                object.material.dispose()
            }
        })
    }
}
updatePCSS(props)

watch(props, () => {
    updatePCSS(props)
})
</script>

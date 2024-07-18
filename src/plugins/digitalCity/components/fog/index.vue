<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-12 11:40:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 11:02:29
-->
<template></template>

<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { Color, FogExp2, Fog } from 'three'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        type?: String
        color?: String
        density?: Number
        near?: Number
        far?: Number
    }>(),
    {
        type: 'Fog',
        color: '#000',
        density: 0.01,
        near: 100,
        far: 4000,
    },
)

const { scene } = useTresContext()
watch(
    () => props.type,
    (nv) => {
        if (nv === 'FogExp2') {
            scene.value.fog = new FogExp2(props.color, props.density)
        } else {
            scene.value.fog = new Fog(props.color, props.near, props.far)
        }
    },
    { immediate: true },
)

watch(
    () => [props.color, props.near, props.far, props.density],
    ([color, near, far, density]) => {
        scene.value.fog.color = new Color(color)
        if (props.type === 'Fog') {
            scene.value.fog.near = near
            scene.value.fog.far = far
        } else {
            scene.value.fog.density = density
        }
    },
)
</script>

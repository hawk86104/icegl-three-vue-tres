<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 08:31:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-25 08:55:27
-->
<template>
    <primitive :object="grid.mesh" />
</template>

<script lang="ts" setup>
import { Grid } from '@pmndrs/vanilla'
import * as THREE from 'three'
import { watchEffect } from 'vue'

const props = withDefaults(
    defineProps<{
        args?: any
        cellColor?: string
        cellSize?: number
        cellThickness?: number
        sectionColor?: string
        sectionSize?: number
        sectionThickness?: number
        fadeDistance?: number
        fadeStrength?: number
        followCamera?: boolean
        infiniteGrid?: boolean
    }>(),
    {
        args: [10, 10],
        cellColor: '#6f6f6f',
        cellSize: 0.6,
        cellThickness: 1,
        sectionColor: '#9d4b4b',
        sectionSize: 3.3,
        sectionThickness: 1.5,
        fadeDistance: 25,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    },
)

const grid = Grid({
    args: props.args,
    cellSize: props.cellSize,
    cellThickness: props.cellThickness,
    cellColor: new THREE.Color(props.cellColor),
    sectionSize: props.sectionSize,
    sectionThickness: props.sectionThickness,
    sectionColor: new THREE.Color(props.sectionColor),
    fadeDistance: props.fadeDistance,
    fadeStrength: props.fadeStrength,
    followCamera: props.followCamera,
    infiniteGrid: props.infiniteGrid,
})

watchEffect(() => {
    const mate = grid.mesh.material as any
    mate.cellSize = props.cellSize
    mate.cellThickness = props.cellThickness
    mate.cellColor.set(props.cellColor)
    mate.sectionColor.set(props.sectionColor)
    mate.sectionSize = props.sectionSize
    mate.sectionThickness = props.sectionThickness
    mate.fadeDistance = props.fadeDistance
    mate.fadeStrength = props.fadeStrength
    mate.followCamera = props.followCamera
    mate.infiniteGrid = props.infiniteGrid
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 14:42:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-22 14:58:16
-->
<template>
    <primitive :object="groundProjection" :scale="props.size" />
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GroundProjectedEnv } from 'three-stdlib'

const props = withDefaults(
    defineProps<{
        texture?: string
        size?: number
    }>(),
    {
        texture: 'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/round_platform_1k.exr',
        size: 100,
    },
)

const exrLoader = new EXRLoader()
//exr from polyhaven.com
const exrTex = await exrLoader.loadAsync(props.texture)
exrTex.mapping = THREE.EquirectangularReflectionMapping

const { scene } = useTresContext()
scene.value.environment = exrTex
// scene.value.background = exrTex
const groundProjection = new GroundProjectedEnv(exrTex)
</script>

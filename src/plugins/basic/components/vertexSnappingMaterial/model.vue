<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 09:25:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 09:54:40
-->
<template>
    <primitive :object="scene" :scale="5" :position="[0, -2, 0]" />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { transToVertexSnappingMaterial } from './index'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        uSnappingResolution?: number
    }>(),
    {
        uSnappingResolution: 6,
    },
)

const { scene, materials } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/MRBike.glb', {
    draco: true,
    decoderPath: './draco/',
})

const resolutionList = [] as any
Object.values(materials).forEach((material: any) => {
    resolutionList.push(transToVertexSnappingMaterial(material, props.uSnappingResolution))
})

watch(
    () => props.uSnappingResolution,
    (newValue) => {
        resolutionList.forEach((item: any) => {
            item.value = newValue
        })
    },
)
</script>

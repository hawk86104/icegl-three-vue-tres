<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-17 17:50:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-29 15:49:53
-->
<template>
    <suspense>
        <TresMesh :geometry="nodes.Object_4.geometry" :rotation="[Math.PI / 2, 0, 0]" :cast-shadow="true" :receive-shadow="true">
            <MeshTransmissionMaterial />
        </TresMesh>
    </suspense>
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import MeshTransmissionMaterial from './stickerTransmisionMaterial.vue'

const { nodes } = await useGLTF('./plugins/eCommerce/model/pack.glb')
</script>

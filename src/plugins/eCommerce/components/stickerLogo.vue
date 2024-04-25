<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-17 18:16:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-17 18:16:49
-->
<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { DoubleSide } from 'three'

const texture = await useTexture(['logo.png'])
</script>
<template>
    <suspense>
        <TresMesh>
            <TresPlaneGeometry />
            <TresMeshPhysicalMaterial :map="texture" :transparent="true" :clearcoat="1" :roughness="1" :metalness="0.8" :side="DoubleSide" />
        </TresMesh>
    </suspense>
</template>

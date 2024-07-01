<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-01 09:51:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-01 10:07:20
-->

<template>
    <TresMesh>
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshStandardMaterial :map="pTexture[0]" :bumpMap="pTexture[1]" :bumpScale="10" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { useTexture } from '@tresjs/core'

const pTexture = await useTexture(['./plugins/earthSample/image/worldMap.jpg', './plugins/earthSample/image/wordBump.jpg'])
pTexture[0].wrapS = pTexture[0].wrapT = pTexture[1].wrapS = pTexture[1].wrapT = THREE.RepeatWrapping
</script>

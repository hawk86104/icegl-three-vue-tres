<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:22:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-03 12:29:35
-->
<template>
    <TresCanvas window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 2, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <gridPlus :args="[3, 3]" />
        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
    </TresCanvas>
    <viewChart :dataJson="dataJson" />
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Environment } from '@tresjs/cientos'
import { gridPlus } from 'PLS/floor'

import { viewChart } from 'PLS/goView'
import dataJson from '../common/1716877101106.json'
</script>

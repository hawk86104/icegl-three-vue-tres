<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-31 09:19:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-31 14:47:52
-->

<template>
    <TresCanvas clearColor="#999" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <OrbitControls />

        <TresMesh>
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
        </TresMesh>
        <basicStart />
        <Suspense>
            <imgBlock />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import basicStart from '../components/threeMeshUI/basicStart.vue'
import imgBlock from '../components/threeMeshUI/imgBlock.vue'
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-12 17:54:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-12 18:06:46
-->
<template>
    <TresCanvas window-size clearColor="#000000">
        <TresPerspectiveCamera :position="[10, 10, 10]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <Box :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" />
        <TresMesh :position="[0, 2, -4]">
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshNormalMaterial />
        </TresMesh>
        <TresGridHelper :args="[10, 10]" />

        <EffectComposer>
            <UnrealBloom :radius="0.8" :strength="2.5" :threshold="0.8" />
						<Glitch />
            <SMAA :width="1920" :height="1080" />
            <Output />
        </EffectComposer>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls, Box } from '@tresjs/cientos'
import { EffectComposer, UnrealBloom, Output, SMAA, Glitch } from '@tresjs/post-processing/three'
</script>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-11-30 23:00:16
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
        <OrbitControls />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[400, 400, 400]" :intensity="1" color="red" />
        <Suspense>
            <noiseContour />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas, useRenderLoop, useTresContextProvider, useTresContext, useTexture } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { AdditiveBlending, DoubleSide, Vector2, LinearFilter, RGBAFormat, WebGLRenderTarget } from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import noiseContour from '../components/noiseContour.vue';
const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
};
</script>

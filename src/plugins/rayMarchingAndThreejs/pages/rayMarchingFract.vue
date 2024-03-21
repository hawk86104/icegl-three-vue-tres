<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[0, 1500, 0]" :fov="45" :near="1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <rayMarchingMaterialFract />
        <!-- <TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
        <TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" /> -->
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRenderLoop, useTexture } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import rayMarchingMaterialFract from '../components/rayMarchingMaterialFract.vue';
import { Pane } from 'tweakpane';
import axios from 'axios';
const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
};
const controlsState = { autoRotate: false, enableDamping: true };

const { onLoop } = useRenderLoop();
onLoop(({ delta }) => { });
onMounted(() => { });
</script>

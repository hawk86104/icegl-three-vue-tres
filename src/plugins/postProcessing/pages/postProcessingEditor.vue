<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 850, -1500]" :fov="45" :near="0.1"
            :far="100000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" :intensity="2" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="2" color="#ffffff" />
        <Suspense>
            <postProcessing />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'; //useRenderLoop
import { OrbitControls } from '@tresjs/cientos';
import postProcessing from '../components/postProcessing.vue';

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
};
const controlsState = { autoRotate: true, enableDamping: true };

const { onLoop } = useRenderLoop();
onLoop(({ delta }) => { });
</script>

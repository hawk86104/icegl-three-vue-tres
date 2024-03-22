<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1"
            :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <TresMesh ref="quanMeshRef" :position="[0, 100, 0]" :rotation-x="((2 * Math.PI) / 360) * 90">
            <TresPlaneGeometry :args="[400, 400]" />
            <TresShaderMaterial v-bind="Material"></TresShaderMaterial>
        </TresMesh>
        <TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
        <TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'; //useRenderLoop
import { OrbitControls } from '@tresjs/cientos';
import { AdditiveBlending, DoubleSide } from 'three';
import stringVertex from '../shaders/argestCircle.vert?raw'
import stringFrag from '../shaders/argestCircle.frag?raw'

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
}
const controlsState = { autoRotate: true, enableDamping: true }

const Material = {
    uniforms: {
        uTime: { type: 'f', value: 0.0 },
    },
    vertexShader: stringVertex,
    fragmentShader: stringFrag,
    side: DoubleSide,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true,
};
const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
    Material.uniforms.uTime.value += delta;
});
</script>

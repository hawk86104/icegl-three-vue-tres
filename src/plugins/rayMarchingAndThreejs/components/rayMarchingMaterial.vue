<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-05 18:57:47
-->
<template>
    <TresMesh ref="MeshRef" :rotation="[Math.PI / 2, 0, 0]">
        <TresPlaneGeometry ref="TresTubeGeometryRef" :args="[1000, 1000]" />
        <TresShaderMaterial v-bind="shader" />
    </TresMesh>
</template>

<script setup lang="ts">
import {  useRenderLoop } from '@tresjs/core'
import { DoubleSide, Vector2 } from 'three'
import { watchEffect } from 'vue'

import stringVertex from '../shaders/rayMarching.vert?raw'
import stringFrag from '../shaders/rayMarching.frag?raw'
const { onLoop, onAfterLoop } = useRenderLoop();
const shader = {
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: DoubleSide,
    vertexShader: stringVertex,
    fragmentShader: stringFrag,
    uniforms: {
        u_resolution: {
            value: new Vector2(window.innerWidth, window.innerHeight),
        },
        u_mouse: {
            value: new Vector2(0, 0),
        },
        u_time: {
            value: 0,
        },
    },
};
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let mouseX = 0;
let mouseY = 0;
function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
}
document.addEventListener('mousemove', onMouseMove, false);
watchEffect(() => {});
onLoop(() => {
    shader.uniforms.u_time.value += 0.01;
    shader.uniforms.u_mouse.value = new Vector2(mouseX, mouseY);
});
onAfterLoop(() => {});
</script>

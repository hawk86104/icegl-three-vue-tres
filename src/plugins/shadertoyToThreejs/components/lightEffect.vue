<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-11-30 23:02:23
-->
<template></template>

<script setup lang="ts">
import { useRenderLoop, useTresContextProvider, useTresContext, useTexture } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { AdditiveBlending, DoubleSide, Vector2, LinearFilter, RGBAFormat, WebGLRenderTarget } from 'three';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import VERTEX from '../shaders/light.vert?raw';
import FRAGMENT from '../shaders/light.frag?raw';

const { camera, renderer, scene, sizes } = useTresContext();

const { onLoop, onAfterLoop } = useRenderLoop();

const resolution = new Vector2(window.innerWidth, window.innerHeight);
const drawShader = {
    uniforms: {
        iResolution: { type: 'v2', value: resolution },
        iTime: { type: 'f', value: null },
        tDiffuse: { value: null },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
};

const composer = new EffectComposer(renderer.value);
composer.addPass(new RenderPass(scene.value, camera.value));
const pass = new ShaderPass(drawShader);
// pass.renderToScreen = true;
composer.addPass(pass);

onLoop(({ elapsed }) => {
    pass.uniforms.iTime.value = elapsed * 0.3;
});
onAfterLoop(() => {
    composer.render();
});
</script>

<template></template>

<script setup lang="ts">
import { useRenderLoop, useTresContext, useTexture } from '@tresjs/core'; //useRenderLoop
import { OrbitControls } from '@tresjs/cientos';
import * as THREE from 'three';
import { postComposer } from '../common/postComposer.js';
import { deepCopy, generateUUID } from '../common/utils.js';

import { Pane } from 'tweakpane';
import InvertPass from '../shaders/invert-fs.glsl?raw';
import FXAAPass from '../shaders/fxaa-fs.glsl?raw';
import SSAOPass from '../shaders/ssao-fs.glsl?raw';
import SEPIAPass from '../shaders/sepia-fs.glsl?raw';
import SNOISEPass from '../shaders/noise-fs.glsl?raw';
import BOXBLURPass from '../shaders/box-blur2-fs.glsl?raw';
import DENOISEPass from '../shaders/denoise-fs.glsl?raw';
import CGAPass from '../shaders/cga-fs.glsl?raw';
import SOBELPass from '../shaders/sobel-fs.glsl?raw';
import RGBPass from '../shaders/rgb-split-fs.glsl?raw';
import DOTPass from '../shaders/dot-screen-fs.glsl?raw';
import CIRCULARPass from '../shaders/circular-blur-fs.glsl?raw';
import POISSONPass from '../shaders/poisson-disc-blur-fs.glsl?raw';
import VIGNETTE2Pass from '../shaders/vignette2-fs.glsl?raw';
import VIGNETTE1Pass from '../shaders/vignette-fs.glsl?raw';
import FREICHENPass from '../shaders/frei-chen-fs.glsl?raw';
import TOONPass from '../shaders/toon-fs.glsl?raw';
import ASCIIPass from '../shaders/ascii-fs.glsl?raw';

import depthfs from '../shaders/packed-depth-fs.glsl?raw';
import depthvs from '../shaders/packed-depth-vs.glsl?raw';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { reactive } from 'vue';
const { camera, renderer, scene, sizes } = useTresContext();

var mergedGeometry = new THREE.BufferGeometry();

var boxGeometries = [];

for (var i = 0; i < 100; i++) {
    var boxGeometry = new THREE.BoxGeometry(100, 100, 100);
    boxGeometry.translate(Math.random() * 1500, Math.random() * 1500, Math.random() * 1500);
    boxGeometries.push(boxGeometry);
}
mergedGeometry = BufferGeometryUtils.mergeGeometries(boxGeometries);
const mapimg = await useTexture({
    map: 'plugins/postProcessing/image/1324.jpg',
});
const normalmapimg = await useTexture({
    map: 'plugins/postProcessing/image/1324-normal.jpg',
});
var material = new THREE.MeshPhongMaterial({
    map: mapimg.map,
    normalMap: normalmapimg.map,
    normalScale: new THREE.Vector2(0.8, -0.8),
    shininess: 100,
});
var model = new THREE.Mesh(mergedGeometry, material);
model.castShadow = true;
model.receiveShadow = true;
scene.value.add(model);
const Composer = new postComposer(renderer.value, {
    useRGBA: true,
});

const pane = new Pane();
let addPassInfo: any = null;

let listData = [
    { text: 'InvertPass', value: { InvertPass } },
    { text: 'FXAAPass', value: { FXAAPass } },
    { text: 'SEPIAPass', value: { SEPIAPass, params: { amount: 10 } } },
    { text: 'SNOISEPass', value: { SNOISEPass, params: { amount: 0.1, speed: 0 } } },
    { text: 'BOXBLURPass', value: { BOXBLURPass, params: { deltax: 10, deltay: 10, taps: 1 } } },
    { text: 'DENOISEPass', value: { DENOISEPass, params: { exponent: 1, strength: 10 } } },
    { text: 'CGAPass', value: { CGAPass, params: { pixelDensity: 4, cgaMap: normalmapimg.map } } },
    { text: 'SOBELPass', value: { SOBELPass } },
    { text: 'RGBPass', value: { RGBPass, params: { x: 1000, y: 1000 } } },
    { text: 'DOTPass', value: { DOTPass } },
    { text: 'CIRCULARPass', value: { CIRCULARPass } },
    { text: 'POISSONPass', value: { POISSONPass } },
    { text: 'VIGNETTE1Pass', value: { VIGNETTE1Pass, params: { falloff: 10, amount: 2 } } },
    { text: 'VIGNETTE2Pass', value: { VIGNETTE2Pass, params: { reduction: 10, boost: 2 } } },
    { text: 'FREICHENPass', value: { FREICHENPass } },
    { text: 'TOONPass', value: { TOONPass } },
];
let key = 'InvertPass';
let value = InvertPass;
let params: any = null;
pane.addBlade({
    view: 'list',
    label: '后处理类型',
    options: listData,
    value: '',
}).on('change', (e) => {
    addPassInfo = e.value;
});
const btn = pane.addButton({
    title: '新增',
    label: '新增通道', // optional
});
let count = 0;
btn.on('click', (e) => {
    key = Object.keys(addPassInfo)[0];
    value = Object.values(addPassInfo)[0];
    params = Object.values(addPassInfo)[1];
    let uuid = count++;
    let f1 = pane.addFolder({
        title: key,
    });
    for (const keyindex in params) {
        let element = params[keyindex];
        f1.addBlade({
            view: 'text',
            label: keyindex,
            parse: (v) => String(v),
            value: element,
        });
    }
    const removebtn = f1
        .addButton({
            title: `移除~${uuid}`,
            label: '关闭通道', // optional
        })
        .on('click', (e) => {
            let uuid = e.target.title.split('~')[1]; // 使用 split() 方法拆分字符串，并获取第二部分
            Composer.removePass(uuid);
        });

    removebtn.on('click', () => {
        f1.dispose();
    });

    let newParams = deepCopy(params, e.target.label, e.value);
    Composer.addPass(key, value, newParams, uuid);
});

Composer.onWindowResize(renderer.value, camera.value);
const { onLoop } = useRenderLoop();
let stack: any = null;
onLoop(({ delta }) => {
    if (model) {
        renderer.value.autoClearColor = true;
        Composer.Reset();

        model.material = material;
        Composer.render(scene.value, camera.value);
        // stack = Composer.Stack;
        // console.log(stack);
        Composer.pass();
        Composer.toScreen(scene.value, camera.value);
    }
});
</script>
<style scoped>
.tp-rotv_c {
    height: 500px;
}
</style>

<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[300, 250, -122]" :fov="45" :near="1"
            :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <primitive :object="cloudModel" :side="DoubleSide" />
        <TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
        <TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRenderLoop, useTexture } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { DoubleSide, Mesh, Vector2, BoxGeometry, Group, PlaneGeometry, TorusKnotGeometry } from 'three';
import ShaderToyMaterial from '../common/ShaderToyMaterial.js';
import { Pane } from 'tweakpane';
import axios from 'axios';
const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
}
const controlsState = { autoRotate: true, enableDamping: true }
const paneControl = new Pane({ title: '参数' });
const cloudPointsState = reactive({
    addres: 'https://www.shadertoy.com/view/mtyGWy',
    shadervalue: ``,
});
let pTexture = await useTexture(['./plugins/earthSample/image/earthA/moon_ring.png']);
let cloudModel = new Group();
let ShaderToymaterialParams = reactive({
    material: {
        uniforms: {
            utime: {
                value: 0,
            },
            uresolution: {
                value: new Vector2(40, 40),
            },
            utexture: {
                value: pTexture,
            },
        },
    },
});
let geometry = new BoxGeometry(100, 100, 100);
paneControl
    .addBlade({
        view: 'list',
        label: 'shadertoy在线地址',
        parse: (v) => String(v),
        options: [
            { text: '1', value: 'https://www.shadertoy.com/view/mtyGWy' },
            { text: '2', value: 'https://www.shadertoy.com/view/tlVGDt' },
            { text: '3', value: 'https://www.shadertoy.com/view/ttKGDt' },
        ],
        value: 'https://www.shadertoy.com/view/mtyGWy',
    })
    .on('change', (e: any) => {
        cloudPointsState.addres = e.value;
        getShadertoy(geometry);
    });
let BOX = new BoxGeometry(100, 100, 100);
let Plane = new PlaneGeometry(100, 100);
let TorusKnot = new TorusKnotGeometry(100, 10, 100, 16);
paneControl
    .addBlade({
        view: 'list',
        label: '几何体',
        options: [
            { text: 'BOX', value: BOX },
            { text: 'Plane', value: Plane },
            { text: 'TorusKnot', value: TorusKnot },
        ],
        value: BOX,
    })
    .on('change', (e: any) => {
        geometry = e.value;
        getShadertoy(geometry);
    });
const getShadertoy = (geometry) => {
    let query = 'https://www.shadertoy.com/api/v1/shaders/' + cloudPointsState.addres.split('https://www.shadertoy.com/view/')[1] + '?key=BdHlhH';
    axios
        .get(query)
        .then(function (response) {
            if (response.data.Error) alert(response.data.Error);
            // console.log(response.data.Shader.renderpass[0].code);
            cloudPointsState.shadervalue = response.data.Shader.renderpass[0].code;
            let ShaderToymaterial = new ShaderToyMaterial(cloudPointsState.shadervalue, ShaderToymaterialParams);

            cloudModel.clear();

            let mesh = new Mesh(geometry, ShaderToymaterial.material);
            cloudModel.add(mesh);
            updateGroupGeometry(cloudModel, geometry);
        })
        .catch(function (error) {
            console.log(error);
        });
};
const updateGroupGeometry = (mesh, geometry) => {
    mesh.children[0].geometry.dispose();
    mesh.children[0].geometry = geometry;
};
const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
    ShaderToymaterialParams.material.uniforms.utime.value += delta;
});
onMounted(() => {
    let geometry = new BoxGeometry(100, 100, 100);
    getShadertoy(geometry);
});
</script>

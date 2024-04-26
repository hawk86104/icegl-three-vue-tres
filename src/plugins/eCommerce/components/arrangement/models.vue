<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 09:39:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-26 11:24:12
-->
<script setup lang="ts">
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { Center, TransmissionMaterial, Caustics } from 'PLS/basic'
import { AccumulativeShadows } from 'PLS/projectionShadow'
import { Pane } from 'tweakpane'
import { reactive } from 'vue'

const innerMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 1,
    color: 'black',
    roughness: 0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    envMapIntensity: 0.6,
})
const { nodes, materials } = await useGLTF('./plugins/eCommerce/model/glass-transformed.glb', { draco: true, decoderPath: './draco/' })

const shadowState = {
    opacity: 0.8,
    alphaTest: 0.85,
    color: 'red',
    blend: 2,
    lightPosition: { x: -1.5, y: 2.5, z: -1 },
    frames: 60,
    blendWindow: 60,
    ambient: 0.5,
}

const materialState = reactive({
    color: '#ffffff',
    roughness: 0,
    reflectivity: 0.1,
    attenuationColor: '#ffffff',
    attenuationDistance: 2,
    chromaticAberration: 0.05,
    anisotropicBlur: 1,
    distortion: 0,
    temporalDistortion: 0,
    backside: true,
    thickness: 0.65,
    backsideThickness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 1,
})

const paneControl = new Pane()
paneControl.hidden = true
paneControl.addBinding(materialState, 'color', {
    label: '颜色',
})
paneControl.addBinding(materialState, 'roughness', {
    label: 'roughness',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'reflectivity', {
    label: 'reflectivity',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'attenuationColor', {
    label: 'attenuationColor',
})
paneControl.addBinding(materialState, 'attenuationDistance', {
    label: 'attenuationDistance',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(materialState, 'chromaticAberration', {
    label: 'chromaticAberration',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(materialState, 'anisotropicBlur', {
    label: 'anisotropicBlur',
    min: 0,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(materialState, 'distortion', {
    label: 'distortion',
    min: 0,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(materialState, 'temporalDistortion', {
    label: 'temporalDistortion',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(materialState, 'backside', {
    label: 'backside',
})
paneControl.addBinding(materialState, 'thickness', {
    label: 'thickness',
    min: 0,
    max: 4,
    step: 0.01,
})
paneControl.addBinding(materialState, 'backsideThickness', {
    label: 'backsideThickness',
    min: 0,
    max: 4,
    step: 0.01,
})

const causticsState = reactive({
    color: 'rgb(255,200, 200)',
    ior: 0.97,
    backsideIOR: 0.98,
    far: 30,
    worldRadius: 0.394,
    intensity: 0.02,
    causticsOnly: false,
    lightSource: { x: -0.05, y: 1, z: 1 },
})
const paneControl2 = new Pane({ title: '参数' })
paneControl2.hidden = true
paneControl2.addBinding(causticsState, 'color', {
    label: '颜色',
})
paneControl2.addBinding(causticsState, 'ior', {
    label: '折射系数',
    min: 0.6,
    max: 1.3,
    step: 0.01,
})
paneControl2.addBinding(causticsState, 'backsideIOR', {
    label: '折射系数2',
    min: 0.6,
    max: 1.3,
    step: 0.01,
})
paneControl2.addBinding(causticsState, 'far', {
    label: '可视距离',
    min: 0,
    max: 30,
    step: 1,
})
paneControl2.addBinding(causticsState, 'worldRadius', {
    label: '材质大小',
    min: 0.001,
    max: 0.5,
    step: 0.001,
})
paneControl2.addBinding(causticsState, 'intensity', {
    label: '强度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl2.addBinding(causticsState, 'causticsOnly', {
    label: '只显示投射',
})
paneControl2.addBinding(causticsState, 'lightSource', {
    label: '光源位置',
    x: { min: -1, max: 1 },
    y: { min: -1, max: 1 },
    z: { min: -1, max: 1 },
})
</script>

<template>
    <TresGroup :position="[0, -0.5, 0]" :rotation="[0, -0.75, 0]">
        <TresMesh :geometry="nodes.cake.geometry" :rotation="[0, -0.5, 0]" :cast-shadow="true" :material="materials.FruitCakeSlice_u1_v1" />

        <TresMesh :geometry="nodes.straw_1.geometry" castShadow :material="materials.straw_2" />
        <TresMesh :geometry="nodes.straw_2.geometry" castShadow :material="materials.straw_1" />
        <TresMesh :geometry="nodes.straw001_1.geometry" :position="[0, -0.005, 0]" :cast-shadow="true" :material="materials.straw_2" />
        <TresMesh :geometry="nodes.straw001_2.geometry" :position="[0, -0.005, 0]" :cast-shadow="true" :material="materials.straw_1" />

        <Center top :rotation="[0, -0.4, 0]" :position="[-1, -0.01, -2]">
            <TresMesh :geometry="nodes.flowers.geometry" castShadow :material="materials['draifrawer_u1_v1.001']" :scale="1.2" />
        </Center>

        <TresMesh castShadow :geometry="nodes.fork.geometry" :material="materials.ForkAndKnivesSet001_1K" material-color="#999" />

        <Caustics v-bind="causticsState">
            <TresMesh castShadow receiveShadow :geometry="nodes.glass.geometry">
                <TransmissionMaterial v-bind="materialState" />
            </TresMesh>
        </Caustics>

        <TresMesh :geometry="nodes.glass_back.geometry" :material="innerMaterial" :scale="[0.95, 1, 0.95]" />
        <TresMesh :geometry="nodes.glass_inner.geometry" :material="innerMaterial" />

        <AccumulativeShadows v-bind="shadowState" />
    </TresGroup>
</template>

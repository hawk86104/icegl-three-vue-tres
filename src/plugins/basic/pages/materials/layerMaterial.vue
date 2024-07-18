<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-03 08:28:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:31:29
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 10, 5]" :fov="30" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" :intensity="2" />
        <Suspense>
            <reflectorDUDV :reflectivity="2.6" showGridHelper :position="[0, -0.6, 0]" />
        </Suspense>

        <TresMesh :position="[0, 0.5, 0]">
            <TresSphereGeometry :args="[1, 500, 500]" />
            <LayerMaterial color="white" lighting="physical">
                <Color :color="layerState.color1" :alpha="layerState.alpha1" />
                <Depth
                    :colorA="layerState.colorA"
                    :colorB="layerState.colorB"
                    :alpha="layerState.alpha2"
                    mode="normal"
                    :near="layerState.near"
                    :far="layerState.far"
                    :origin="new THREE.Vector3(100, 100, 100)"
                />
            </LayerMaterial>
        </TresMesh>
    </TresCanvas>
</template>
<script setup lang="ts">
import { reactive, shallowReactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { LayerMaterial, Color, Depth } from 'PLS/basic/components/forCientos/LayerMaterial'
import { reflectorDUDV } from 'PLS/floor'

const state = reactive({
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    antialias: true,
    pixelRatio: window.devicePixelRatio,
    shadowMapType: THREE.BasicShadowMap,
    outputColorSpace: THREE.SRGBColorSpace,
    toneMapping: THREE.ACESFilmic,
    useLegacyLights: true,
})
const controlsState = reactive({
    autoRotate: true,
})

const layerState = shallowReactive({
    color1: '#000000',
    alpha1: 1.0,
    colorA: '#ed08ff',
    colorB: '#1bff00',
    alpha2: 1.1,
    near: 0.87,
    far: 299.77,
})

const paneControl = new Pane({
    expanded: true,
})
const f1 = paneControl.addFolder({
    title: 'Color层',
})
f1.addBinding(layerState, 'color1', { label: '颜色' })
f1.addBinding(layerState, 'alpha1', {
    label: 'alpha',
    step: 0.1,
    min: 0,
    max: 2,
})

const f2 = paneControl.addFolder({
    title: 'Depth层',
})
f2.addBinding(layerState, 'colorA', { label: '颜色A' })
f2.addBinding(layerState, 'colorB', { label: '颜色B' })
f2.addBinding(layerState, 'alpha2', {
    label: 'alpha',
    step: 0.1,
    min: 0,
    max: 2,
})
f2.addBinding(layerState, 'near', {
    label: 'near',
    step: 0.01,
    min: 0,
    max: 1,
})
f2.addBinding(layerState, 'far', {
    label: 'far',
    step: 0.01,
    min: 299,
    max: 300,
})
</script>

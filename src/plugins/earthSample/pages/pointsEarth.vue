<script setup lang="ts">
import * as THREE from 'three'
import { shallowRef } from 'vue'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
// import loading from 'PLS/UIdemo/components/loading/default.vue'
import { Pane } from 'tweakpane'
import ParticalMesh from '@/plugins/UIdemo/components/particalMesh.vue'
import vertex from '../shaders/pointsEarth.vert?raw'
import fragment from '../shaders/pointsEarth.frag?raw'

const params = {
    color: '#17c5a9',
    pointSize: 4.0,
}

const gl = {
    clearColor: '#122148',
    shadows: false,
    alpha: false,
    outputColorSpace: THREE.SRGBColorSpace,
}

const wireframeMaterial = {
    color: params.color,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
}

const textures = await useTexture([
    './plugins/earthSample/image/pointsEarth/00_earthmap1k.jpg',
    './plugins/earthSample/image/pointsEarth/circle.png',
    './plugins/earthSample/image/pointsEarth/04_rainbow1k.jpg',
    './plugins/earthSample/image/pointsEarth/01_earthbump1k.jpg',
    './plugins/earthSample/image/pointsEarth/02_earthspec1k.jpg',
])

const earthMap = textures[0]
const starSprite = textures[1]
const colorMap = textures[2]
const elevMap = textures[3]
const alphaMap = textures[4]

const pointsShader = {
    uniforms: {
        size: { type: 'f', value: params.pointSize },
        uTime: { type: 'f', value: 0.0 },
        uWaveHeight: { type: 'f', value: 0.075 },
        uWaveSpeed: { type: 'f', value: 0.2 },
        colorTexture: { type: 't', value: colorMap },
        elevTexture: { type: 't', value: elevMap },
        alphaTexture: { type: 't', value: alphaMap },
        earthTexture: { type: 't', value: earthMap },
        starTexture: { type: 't', value: starSprite },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: THREE.FrontSide,
}

const groupRef = shallowRef()
const wireframeMaterialRef = shallowRef()

const pane = new Pane()
const debugFolder = pane.addFolder({ title: 'Debug' })
debugFolder.addBinding(params, 'color', { type: 'color' }).on('change', ({ value }) => {
    wireframeMaterialRef.value.color.set(value)
})
debugFolder.addBinding(pointsShader.uniforms.size, 'value', {
    min: 0.1,
    max: 10,
    step: 0.1,
    label: '粒子大小',
})

debugFolder.addBinding(pointsShader.uniforms.uWaveHeight, 'value', {
    min: 0.01,
    max: 0.5,
    step: 0.01,
    label: '海浪高度',
})

debugFolder.addBinding(pointsShader.uniforms.uWaveSpeed, 'value', {
    min: 0.01,
    max: 1,
    step: 0.01,
    label: '海浪变化速度',
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
    if (groupRef.value) {
        groupRef.value.rotation.y += 0.002
        pointsShader.uniforms.uTime.value += 10 * delta
    }
})
</script>

<template>
    <!-- <loading /> -->
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[0, 0, 3.5]" :fov="45" :near="0.1" :far="20" />
        <OrbitControls :autoRotate="true" :autoRotateSpeed="2" />
        <TresGroup ref="groupRef">
            <TresMesh>
                <TresIcosahedronGeometry :args="[1, 4]" />
                <TresMeshBasicMaterial ref="wireframeMaterialRef" v-bind="wireframeMaterial"> </TresMeshBasicMaterial>
            </TresMesh>
            <TresPoints>
                <TresIcosahedronGeometry :args="[1, 128]" />
                <TresShaderMaterial v-bind="pointsShader" />
            </TresPoints>
        </TresGroup>
        <TresHemisphereLight :args="['#ffffff', '#080820', 3]" />
    </TresCanvas>
</template>

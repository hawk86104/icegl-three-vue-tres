<template>
    <caustics :lightFrontGeometry="_geometry" :waterTexture="texture" :light="light" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import vertexShader from '../../shaders/simulation/vertex.glsl'
import dropFragmentShader from '../../shaders/simulation/drop_fragment.glsl'
import normalFragmentShader from '../../shaders/simulation/normal_fragment.glsl'
import updateFragmentShader from '../../shaders/simulation/update_fragment.glsl'
import caustics from './caustics.vue'

const props = defineProps<{
    light: THREE.Light
}>()

const _camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0, 2000)
const _geometry = new THREE.PlaneGeometry(2, 2)
const _textureA = new THREE.WebGLRenderTarget(256, 256, { type: THREE.FloatType })
const _textureB = new THREE.WebGLRenderTarget(256, 256, { type: THREE.FloatType })

const dropMaterial = new THREE.RawShaderMaterial({
    uniforms: {
        center: { value: [0, 0] },
        radius: { value: 0 },
        strength: { value: 0 },
        texture: { value: null },
    },
    vertexShader,
    fragmentShader: dropFragmentShader,
})

const normalMaterial = new THREE.RawShaderMaterial({
    uniforms: {
        delta: { value: [1 / 256, 1 / 256] }, // TODO: Remove this useless uniform and hardcode it in shaders?
        texture: { value: null },
    },
    vertexShader,
    fragmentShader: normalFragmentShader,
})

const updateMaterial = new THREE.RawShaderMaterial({
    uniforms: {
        delta: { value: [1 / 256, 1 / 256] }, // TODO: Remove this useless uniform and hardcode it in shaders?
        texture: { value: null },
    },
    vertexShader,
    fragmentShader: updateFragmentShader,
})

const _dropMesh = new THREE.Mesh(_geometry, dropMaterial)
const _normalMesh = new THREE.Mesh(_geometry, normalMaterial)
const _updateMesh = new THREE.Mesh(_geometry, updateMaterial)

let texture = _textureA
const _render = (renderer, mesh) => {
    const oldTexture = texture
    const newTexture = texture === _textureA ? _textureB : _textureA

    mesh.material.uniforms.texture.value = oldTexture.texture
    renderer.setRenderTarget(newTexture)

    // TODO Camera is useless here, what should be done?
    renderer.render(mesh, _camera)

    texture = newTexture
}
const stepSimulation = (renderer) => {
    _render(renderer, _updateMesh)
}

const updateNormals = (renderer) => {
    _render(renderer, _normalMesh)
}

const white = new THREE.Color('white')
const { renderer } = useTresContext()
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    stepSimulation(renderer.value)
    updateNormals(renderer.value)

    renderer.value.setRenderTarget(null)
    renderer.value.setClearColor(white, 1)
    renderer.value.clear()
})
</script>

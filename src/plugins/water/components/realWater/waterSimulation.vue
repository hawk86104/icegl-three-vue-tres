<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-18 10:10:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-19 11:24:18
-->
<template>
    <caustics :lightFrontGeometry="_geometry" :waterTexture="texture.texture" :light="light" />
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
    light: Array<number>
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
const _render = (renderer: any, mesh: any) => {
    const oldTexture = texture
    const newTexture = texture === _textureA ? _textureB : _textureA

    mesh.material.uniforms.texture.value = oldTexture.texture
    renderer.setRenderTarget(newTexture)

    // TODO Camera is useless here, what should be done?
    renderer.render(mesh, _camera)

    texture = newTexture
}
const stepSimulation = (renderer: any) => {
    _render(renderer, _updateMesh)
}

const updateNormals = (renderer: any) => {
    _render(renderer, _normalMesh)
}

const { renderer, camera, raycaster } = useTresContext() as any
renderer.value.autoClear = false
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    stepSimulation(renderer.value)
    updateNormals(renderer.value)
})

const addDrop = (x: number, y: number, radius: number, strength: number) => {
    _dropMesh.material.uniforms['center'].value = [x, y]
    _dropMesh.material.uniforms['radius'].value = radius
    _dropMesh.material.uniforms['strength'].value = strength
    _render(renderer.value, _dropMesh)
}

const mouse = new THREE.Vector2()
const targetgeometry = new THREE.PlaneGeometry(2, 2)
const position = targetgeometry.attributes.position
for (let i = 0; i < position.count; i++) {
    const z = -position.getY(i)
    position.setY(i, 0)
    position.setZ(i, z)
}
position.needsUpdate = true
const targetmesh = new THREE.Mesh(targetgeometry)
const onMouseMove = (event: any) => {
    const rect = renderer.value.domElement.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    mouse.x = ((event.clientX - rect.left) * 2) / width - 1
    mouse.y = (-(event.clientY - rect.top) * 2) / height + 1

    raycaster.value.setFromCamera(mouse, camera.value)

    const intersects = raycaster.value.intersectObject(targetmesh)

    for (let intersect of intersects) {
        addDrop(intersect.point.x, intersect.point.z, 0.03, 0.04)
    }
}
const mouseEventHandler = {
  handleEvent: onMouseMove
};
const mouseEvent = (isOn: boolean) => {
    if(isOn){
        renderer.value.domElement.addEventListener('mousemove', mouseEventHandler)
    } else {
        renderer.value.domElement.removeEventListener('mousemove',mouseEventHandler)
    }
}
defineExpose({ addDrop, mouseEvent })
</script>

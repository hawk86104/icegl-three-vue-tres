<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-18 10:52:37
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-19 10:25:58
-->
<template>
    <Suspense>
        <water :waterTexture="waterTexture" :causticsTexture="texture.texture" :light="light" :geometry="_geometry" />
    </Suspense>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import vertexShader from '../../shaders/caustics/vertex.glsl'
import fragmentShader from '../../shaders/caustics/fragment.glsl'
import water from './water.vue'

const props = defineProps<{
    lightFrontGeometry: THREE.BufferGeometry
    waterTexture: THREE.Texture
    light: Array<number>
}>()

const _camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0, 2000)
const _geometry = new THREE.PlaneGeometry(2, 2, 200, 200)
const texture = new THREE.WebGLRenderTarget(1024, 1024)

const material = new THREE.ShaderMaterial({
    uniforms: {
        light: { value: props.light },
        water: { value: null },
    },
    vertexShader,
    fragmentShader,
})

const _causticMesh = new THREE.Mesh(_geometry, material)

const black = new THREE.Color('black')
const { renderer } = useTresContext()
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    _causticMesh.material.uniforms['water'].value = props.waterTexture

    renderer.value.setRenderTarget(texture)
    renderer.value.setClearColor(black, 0)
    renderer.value.clear()

    // TODO Camera is useless here, what should be done?
    renderer.value.render(_causticMesh, _camera)
})
</script>

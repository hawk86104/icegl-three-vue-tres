<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-18 11:08:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-19 10:43:09
-->
<template>
    <pool :tiles="pTexture" :light="light" :waterTexture="waterTexture" :causticsTexture="causticsTexture" ref="pooRef" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import * as THREE from 'three'
import { useRenderLoop, useTresContext, useTexture } from '@tresjs/core'
import vertexShader from '../../shaders/water/vertex.glsl'
import fragmentShader from '../../shaders/water/fragment.glsl'
import pool from './pool.vue'

const props = defineProps<{
    waterTexture: THREE.Texture
    causticsTexture: THREE.Texture
    geometry: THREE.BufferGeometry
    light: Array<number>
}>()

const geometry = props.geometry //new THREE.PlaneGeometry(2, 2, 200, 200)

const cubetextureloader = new THREE.CubeTextureLoader()
const textureCube = cubetextureloader
    .setPath('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/')
    .load(['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg'])

const pTexture = await useTexture(['./plugins/water/images/tiles.jpg'])
const material = new THREE.RawShaderMaterial({
    uniforms: {
        light: { value: props.light },
        tiles: { value: pTexture },
        sky: { value: textureCube },
        water: { value: null },
        causticTex: { value: null },
        underwater: { value: false },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
})

const mesh = new THREE.Mesh(geometry, material)

const pooRef = ref(null) as any

const white = new THREE.Color('white')
const { renderer, camera } = useTresContext() as any
const { onLoop } = useRenderLoop()
onLoop(() => {
    renderer.value.setRenderTarget(null)
    renderer.value.setClearColor(white, 1)
    renderer.value.clear()

    material.uniforms['water'].value = props.waterTexture
    material.uniforms['causticTex'].value = props.causticsTexture

    material.side = THREE.FrontSide
    material.uniforms['underwater'].value = true
    renderer.value.render(mesh, camera.value)

    material.side = THREE.BackSide
    material.uniforms['underwater'].value = false
    renderer.value.render(mesh, camera.value)
})
</script>

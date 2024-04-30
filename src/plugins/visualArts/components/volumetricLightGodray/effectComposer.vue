<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-30 10:59:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-30 16:05:53
-->
<template></template>

<script setup lang="ts">
import { watchEffect, toRaw } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { EffectComposer, EffectPass, RenderPass, BloomEffect, GodRaysEffect } from 'postprocessing'

const props = withDefaults(
    defineProps<{
        screen: THREE.Mesh
    }>(),
    {},
)
const { camera, renderer, scene, sizes } = useTresContext()
let effectComposer = null as any
let effectPass = null as any
const effects = [] as any[]
const init = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
    effectComposer = new EffectComposer(renderer, {
        frameBufferType: THREE.HalfFloatType,
        multisampling: 8,
    })
    const renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)
}

const addBloomEffect = () => {
    effects.push(
        new BloomEffect({
            luminanceThreshold: 0,
            mipmapBlur: true,
            luminanceSmoothing: 0.0,
            intensity: 1,
        }),
    )
}

const addGodRaysEffect = (camera: THREE.PerspectiveCamera) => {
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffddaa,
        transparent: true,
        fog: false,
    })
    const sunGeometry = new THREE.SphereGeometry(0.75, 32, 32)
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.frustumCulled = false
    sun.matrixAutoUpdate = false
    const godRaysEffect = new GodRaysEffect(camera, toRaw(props.screen), {
        blur: true,
        decay: 0.8,
        exposure: 0.34,
    })
    effects.push(godRaysEffect)
}

const makeEffectPass = (camera: THREE.PerspectiveCamera) => {
    effectPass = new EffectPass(camera, ...effects)
    effectComposer.addPass(effectPass)
}

watchEffect(() => {
    if (sizes.width.value) {
        const camerav = camera.value as any
        init(scene.value, camerav, renderer.value, sizes.width.value, sizes.height.value)
        addGodRaysEffect(camerav)
        addBloomEffect()
        makeEffectPass(camerav)
    }
})

const { onAfterLoop } = useRenderLoop()
onAfterLoop(() => {
    if (effectComposer) {
        effectComposer.render()
    }
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 08:12:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 10:25:06
-->
<template>
    <Box ref="normalBox" :args="[1, 1, 1]" color="orange" :position="[3, 2, 1]" />
    <TresMesh ref="shineBox" :position="[0, 2, -4]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh ref="filmBox" :position="[1, 2, 3]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
    </TresMesh>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import * as THREE from 'three'
import { Box } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'

const { camera, renderer, scene, sizes } = useTresContext()

const normalBox = ref()
const shineBox = ref()
const filmBox = ref()

let effectComposer = null as any
const params = {
    threshold: 0,
    strength: 0.972, // 强度
    radius: 0.21, // 半径
}
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
    // 渲染器通道，将场景全部加入渲染器
    const renderScene = new RenderPass(scene, camera)
    // 添加虚幻发光通道
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
    // 创建合成器
    effectComposer = new EffectComposer(renderer)
    // 将渲染器和场景结合到合成器中
    effectComposer.addPass(renderScene)
    effectComposer.addPass(bloomPass)
}

// let effectComposer2 = null as any
// const filmPassEffect = (scene2: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
// 	var renderPass2 = new RenderPass(scene2, camera)

// 	const filmPass = new FilmPass()
// 	// 创建合成器
// 	effectComposer2 = new EffectComposer(renderer)
// 	// 将渲染器和场景结合到合成器中
// 	effectComposer2.addPass(renderPass2)
// 	effectComposer2.addPass(filmPass)
// }
// filmPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
watchEffect(() => {
    if (normalBox.value) {
        normalBox.value.instance.layers.set(0)
    }
    if (shineBox.value) {
        shineBox.value.layers.set(1)
    }
    if (filmBox.value) {
        filmBox.value.layers.set(2)
    }
    if (sizes.width.value) {
        bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
    }
})
const { onLoop } = useRenderLoop()
onLoop(() => {
    if (effectComposer && camera.value) {
        renderer.value.clear()

        camera.value.layers.set(1)
        effectComposer.render()

        // renderer.value.clearDepth() // 清除深度缓存
        // camera.value.layers.set(2)
        // effectComposer2.render()

        renderer.value.clearDepth() // 清除深度缓存

        camera.value.layers.set(0)
        renderer.value.render(scene.value, camera.value)
    }
})
</script>

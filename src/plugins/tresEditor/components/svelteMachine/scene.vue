<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-22 08:36:08
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-22 12:14:39
-->
<template>
    <!-- name:svelte-conveyor-belt.glb uuid:6ed6209f-3fe1-4809-ae6b-bf61e255d699 type:Group -->
    <primitive :object="sceneObject.children[0]">
        <firstLevelbf61e255d699 :object="sceneObject.children[0].children" />
    </primitive>
    <!-- name:AmbientLight uuid:5207b1ea-5fd9-4a73-ba31-e8047f43cfb7 type:AmbientLight -->
    <primitive :object="sceneObject.children[1]" />
    <!-- name:DirectionalLight uuid:2d49d9c3-aa79-44fb-9d6a-0436ae20839a type:DirectionalLight -->
    <primitive :object="sceneObject.children[2]" />
    <!-- name:DirectionalLight uuid:beea1423-1e37-47ab-9443-f8429259e120 type:DirectionalLight -->
    <primitive :object="sceneObject.children[3]" />
    <!-- name:SpotLight uuid:1d0e8871-bd60-47f9-8ab7-232dabd30201 type:SpotLight -->
    <primitive :object="sceneObject.children[4]" ref="spotLightRef" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { loadImageToBase64, loadJsonFile } from 'PLS/tresEditor'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import player from './eventScript'
import firstLevelbf61e255d699 from './childComponent/firstLevel-bf61e255d699.vue'

const { scene: tresScene, renderer, camera, sizes } = useTresContext()
player.init(tresScene, renderer, camera, sizes)

const loader = new THREE.ObjectLoader()

const scene = await loadJsonFile('./plugins/tresEditor/svelteMachine/json/scene.json')

if (scene.geometries) {
    for (const geometry of scene.geometries) {
        if (geometry.data && geometry.data.startsWith('url:')) {
            let url = geometry.data.slice(4)
            if (url.startsWith('geometries/')) {
                url = `./plugins/tresEditor/svelteMachine/${url}`
            }
            geometry.data = await loadJsonFile(url)
        }
    }
}
if (scene.images) {
    for (const image of scene.images) {
        if (image.url && image.url.startsWith('url:')) {
            let url = image.url.slice(4)
            if (url.startsWith('images/')) {
                url = `./plugins/tresEditor/svelteMachine/${url}`
            }
            image.url = await loadImageToBase64(url)
        }
    }
}

const sceneObject = loader.parse(scene) as any
const spotLightRef = ref(null)
onMounted(() => {
    tresScene.value.background = sceneObject.background
    tresScene.value.environment = sceneObject.environment
    tresScene.value.fog = sceneObject.fog
    player.load(sceneObject)
    player.play()

    if (spotLightRef.value) {
        const sLight = spotLightRef.value as any
        sLight.target.position.set(-3.8, 0, -2.3)
        tresScene.value.add(sLight.target)
        sLight.angle = Math.PI / 2.5
    }
})
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    if (player.renderer) {
        player.render(elapsed * 1000, delta * 1000)
    }

    if (spotLightRef.value) {
        const sLight = spotLightRef.value as any
        sLight.intensity = 100 + Math.sin(elapsed * 2) * 100
    }
})
</script>

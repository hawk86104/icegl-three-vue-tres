<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-17 16:18:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-17 16:25:06
-->
<template>
    <!-- name:AmbientLight uuid:d734c277-95ab-436d-a0b9-50aaddcd2c29 type:AmbientLight -->
    <primitive :object="sceneObject.children[0]" />
    <!-- name:bakedModel.glb uuid:2cb90c15-16b4-4e37-b79b-42dee480409b type:Group -->
    <primitive :object="sceneObject.children[1]">
        <firstLevel42dee480409b :object="sceneObject.children[1].children" />
    </primitive>
    <!-- name:DirectionalLight uuid:1c7cef54-ac31-4994-b4c8-259af228c777 type:DirectionalLight -->
    <primitive :object="sceneObject.children[2]" />
    <!-- name:Plane uuid:b76d97b2-0cef-486d-862b-f83c140c795b type:Mesh -->
    <primitive :object="sceneObject.children[3]" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { loadImageToBase64, loadJsonFile } from 'PLS/tresEditor'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import player from './eventScript'
import firstLevel42dee480409b from './childComponent/firstLevel-42dee480409b.vue'

const { scene: tresScene, renderer, camera, sizes } = useTresContext()
player.init(tresScene, renderer, camera, sizes)

const loader = new THREE.ObjectLoader()
const scene = await loadJsonFile('./plugins/tresEditor/json/scene.json')

if (scene.geometries) {
    for (const geometry of scene.geometries) {
        if (geometry.data && geometry.data.startsWith('url:')) {
            let url = geometry.data.slice(4)
            if (url.startsWith('geometries/')) {
                url = `./plugins/tresEditor/${url}`
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
                url = `./plugins/tresEditor/${url}`
            }
            image.url = await loadImageToBase64(url)
        }
    }
}

const sceneObject = loader.parse(scene) as any
onMounted(() => {
    tresScene.value.background = sceneObject.background
    tresScene.value.environment = sceneObject.environment
    tresScene.value.fog = sceneObject.fog
    player.load(sceneObject)
    player.play()
})
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    if (player.renderer) {
        player.render(elapsed * 1000, delta * 1000)
    }
})
</script>

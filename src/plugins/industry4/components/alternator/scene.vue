<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-28 09:23:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-29 10:46:11
-->
<template>
    <!-- name:AmbientLight uuid:4a88f8db-06d0-47b4-ad5f-aad9885c3b29 type:AmbientLight -->
    <primitive :object="sceneObject.children[0]" />
    <!-- name:bj .glb uuid:a0966008-e71e-4b13-bc13-86e5869a71b5 type:Group -->
    <primitive :object="sceneObject.children[1]">
        <firstLevel86e5869a71b5 :object="sceneObject.children[1].children" />
    </primitive>
    <!-- name:fdj .glb uuid:192ca4fd-3655-414f-a95d-da662feb67b1 type:Group :rotation="[-Math.PI, 0, 0]"  :position="[-2.2829428261014804, 0.10302746578115585, 0.8980185643838392]"-->
    <TresGroup :position="[2.2829428261014804, -0.08, -0.8980185643838392]">
        <primitive :object="sceneObject.children[2]">
            <firstLevelda662feb67b1 :object="sceneObject.children[2].children" />
        </primitive>
    </TresGroup>
    <!-- name:DirectionalLight uuid:76d3cd67-1b53-40f5-b5b6-59a9be50ec03 type:DirectionalLight -->
    <primitive :object="sceneObject.children[3]" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAnimations } from '@tresjs/cientos'
import * as THREE from 'three'
import { loadJsonFile, loadRemoteZip } from 'PLS/tresEditor'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import player from './eventScript'
import firstLevel86e5869a71b5 from './childComponent/firstLevel-86e5869a71b5.vue'
import firstLevelda662feb67b1 from './childComponent/firstLevel-da662feb67b1.vue'
import { adjustGroupCenter } from 'PLS/digitalCity'

const { scene: tresScene, renderer, camera, sizes } = useTresContext()
player.init(tresScene, renderer, camera, sizes)

const loader = new THREE.ObjectLoader()
const scene = await loadJsonFile('./plugins/industry4/alternator/json/scene.json')

if (scene.geometries) {
    const geometriesZip = await loadRemoteZip('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/alternator/geometries.zip')
    for (const geometry of scene.geometries) {
        if (geometry.data && geometry.data.startsWith('url:')) {
            let url = geometry.data.slice(4)
            geometry.data = JSON.parse(await geometriesZip.files[url].async('string'))
        }
    }
}
if (scene.images) {
    const imagesZip = await loadRemoteZip('./plugins/industry4/alternator/images.zip')
    for (const image of scene.images) {
        if (image.url && image.url.startsWith('url:')) {
            let url = image.url.slice(4)
            if (url.endsWith('.json')) {
                image.url = JSON.parse(await imagesZip.files[url].async('string'))
            } else {
                const idata = await imagesZip.files[url].async('base64')
                const fileNameParts = url.split('.')
                const extension = fileNameParts[fileNameParts.length - 1].toUpperCase()
                image.url = `data:image/${extension};base64,${idata}`
            }
        }
    }
}

const sceneObject = loader.parse(scene) as any

sceneObject.children[2].position.set(0, -0.13, 0)

adjustGroupCenter(sceneObject.children[2])

sceneObject.children[2].rotation.x = Math.PI

// objectToSceneCenter(sceneObject.children[2])
// objectToSceneCenter(sceneObject.children[1])
// const animations = loader.parseAnimations(scene.animations)
// const { actions } = useAnimations([animations['500410ba-1a32-40b9-a8db-5db7c9d0be6b'], animations['ee5fa32b-1e08-414f-bbfb-c3fa6d1e6883']], sceneObject)
// const currentAction = actions.fangai //fangai chaifen
// currentAction.loop = THREE.LoopOnce
// currentAction.clampWhenFinished = true
// currentAction.play()

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

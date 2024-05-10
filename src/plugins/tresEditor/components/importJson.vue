<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:25:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-10 11:56:33
-->
<template></template>

<script lang="ts" setup>
import * as THREE from 'three'
import { loadJson, initEvents } from '../common/utils'
import { useTresContext } from '@tresjs/core'
var loader = new THREE.ObjectLoader()

const { scene, renderer, camera } = useTresContext()
const setScene = (value: any) => {
    if (value.children) {
        scene.value.add(...value.children)
    }
}

const files = await loadJson('./plugins/tresEditor/json/app.json')
console.log(files)

//目前 只管场景，不包含 摄像头的控制
setScene(loader.parse(files.scene))

initEvents(renderer.value, scene.value, camera.value, files.scripts)
// initEvents = (renderer, scene, camera, scriptsObg)
</script>

<template>
   <primitive :object="model"  />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import * as THREE from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { useTresContext, useRenderLoop} from '@tresjs/core'
import {  useGLTF} from '@tresjs/cientos'
const { scene: model, nodes } = await useGLTF('/plugins/operationTool/model/湖中小亭/湖中小亭.gltf')
const { camera, renderer, scene, sizes, raycaster, controls } = useTresContext()

let selectionBox = new SelectionBox(camera.value, scene.value)
let helper = new SelectionHelper(renderer.value, 'selectBox')
let init = function () {
    document.addEventListener('mousedown', onMouseDown, false)
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mouseup', onMouseUp, false)
}

let onMouseDown = function (event) {

    console.log(controls.value);
    
    for (const item of selectionBox.collection) {
        if (item instanceof THREE.Mesh) {
            item.material.emissive.set(0x000000)
        }
    }
    selectionBox.collection.length = 0
    selectionBox.startPoint.set((event.clientX / sizes.width.value) * 2 - 1, -(event.clientY / sizes.height.value) * 2 + 1, 0.5)
}

let onMouseMove = function (event) {
    if (helper.isDown) {
       
        selectionBox.endPoint.set((event.clientX / sizes.width.value) * 2 - 1, -(event.clientY / sizes.height.value) * 2 + 1, 0.5)
        const allSelected = selectionBox.select()
        console.log("allSelected",allSelected);
        
        for (let i = 0; i < allSelected.length; i++) {
            let item = allSelected[i]
            if (item instanceof THREE.Mesh) {
                item.material.emissive.set(0xf80000)
            }
        }
    }
}

let onMouseUp = function (event) {
    const allSelected = selectionBox.select()
    selectionBox.endPoint.set((event.clientX / sizes.width.value) * 2 - 1, -(event.clientY / sizes.height.value) * 2 + 1, 0.5)
    for (let i = 0; i < allSelected.length; i++) {
        let item = allSelected[i]
        if (item instanceof THREE.Mesh) {
            item.material.emissive.set(0x000000)
        }
    }
}
onMounted(() => {
    init()
})
watchEffect(() => {})
</script>
<style>
.selectBox {
    border: 1px solid #55aaff;
    background-color: rgba(75, 160, 255, 0.3);
    position: fixed;
}
</style>

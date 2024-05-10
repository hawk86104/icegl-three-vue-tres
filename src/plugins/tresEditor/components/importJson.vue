<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:25:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-10 18:30:30
-->
<template></template>

<script lang="ts" setup>
import * as THREE from 'three'
import { loadJson, initEvents, exporterJsonZip } from '../common/utils'
import { useTresContext } from '@tresjs/core'
import { Pane } from 'tweakpane'
import { onMounted } from 'vue'

let fileInput = null
var loader = new THREE.ObjectLoader()
const group = new THREE.Group()
const { scene, renderer, camera } = useTresContext()
const setScene = (value: any) => {
    if (value.children) {
        group.children = value.children
        scene.value.add(group)
        // scene.value.add(...value.children)
    }
}

const files = await loadJson('./plugins/tresEditor/json/app.json')
// console.log(files)

//目前 只管场景，不包含 摄像头的控制
// setScene(loader.parse(files.scene))

// initEvents(renderer.value, scene.value, camera.value, files.scripts)

const paneControl = new Pane()
const inputB = paneControl.addButton({
    title: '导入原生场景Json',
    label: 'srcJson',
})
inputB.on('click', () => {
    debugger
    fileInput.accept = '.json'
    fileInput.click()
})
const btn = paneControl.addButton({
    title: '导出分解场景Zip',
    label: 'JsonZip',
})
btn.on('click', () => {
    exporterJsonZip(files)
})

onMounted(() => {
    fileInput = document.getElementById('fileInput')
    if (!fileInput) {
        return
    }
    fileInput.onchange = (event) => {
        debugger
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            const contents = e.target.result
            const jsonData = JSON.parse(contents)
            setScene(loader.parse(jsonData.scene))
            console.log('JSON数据:', jsonData)
            // 这里可以使用jsonData对象进行后续操作
        }

        reader.readAsText(file)
    }
})
</script>

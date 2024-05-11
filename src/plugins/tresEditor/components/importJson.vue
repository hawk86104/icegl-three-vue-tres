<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:25:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-11 11:31:42
-->
<template></template>

<script lang="ts" setup>
import * as THREE from 'three'
import { initEvents, registerEvent, unregisterEvent, updateEvents, exporterJsonZip } from '../common/utils'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Pane } from 'tweakpane'
import { onMounted, watch } from 'vue'
import { FMessage } from '@fesjs/fes-design'

let fileInput: any
let jsonData = null as any
var loader = new THREE.ObjectLoader()
let group = null as THREE.Group | null
const { scene, renderer, camera, sizes } = useTresContext()
const clearScene = () => {
    if (!group) {
        return
    }
    const clearCache = (item: any) => {
        item.geometry?.dispose()
        item.material?.dispose()
    }
    const removeObj = (obj: any) => {
        let arr = obj.children.filter((x) => !!x)
        arr.forEach((item: any) => {
            if (item.children.length) {
                removeObj(item)
            } else {
                clearCache(item)
                item.clear()
            }
        })
        obj.clear()
        arr = null
    }
    removeObj(group)
    group = null
}
const setScene = (value: any) => {
    clearScene()
    group = new THREE.Group()
    if (value.children) {
        group.children = value.children
        scene.value.add(group)
    }
}

// const files = await loadJson('./plugins/tresEditor/json/app.json')
// console.log(files)
//目前 只管场景，不包含 摄像头的控制
// setScene(loader.parse(files.scene))
// initEvents(renderer.value, scene.value, camera.value, files.scripts)

const paneControl = new Pane()
const inputClear = paneControl.addButton({
    title: '清空场景',
    label: 'clear',
})
inputClear.on('click', () => {
    const result = confirm('确定要执行操作吗？')
    if (result) {
        window.location.reload()
    }
    // unregisterEvent()
    // clearScene()
    // FMessage.success?.({
    //     content: '清空场景成功',
    //     colorful: true,
    // })
})
const inputB = paneControl.addButton({
    title: '导入原生场景Json',
    label: 'srcJson',
})
inputB.on('click', () => {
    if (fileInput) {
        fileInput.accept = '.json'
        // 清除文件输入框的值
        fileInput.value = null
        fileInput.click()
    }
})
const btn = paneControl.addButton({
    title: '导出分解场景Zip',
    label: 'JsonZip',
})
btn.on('click', () => {
    if (jsonData) {
        exporterJsonZip(jsonData)
    } else {
        FMessage.warning?.({
            content: '场景内无物体',
            colorful: true,
        })
    }
})
onMounted(() => {
    fileInput = document.getElementById('fileInput')
    if (!fileInput) {
        return
    }
    fileInput.onchange = (event: any) => {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = (e: any) => {
            const contents = e.target.result
            jsonData = JSON.parse(contents)
            setScene(loader.parse(jsonData.scene))

            initEvents(renderer.value, scene.value, camera.value, sizes, jsonData)
            registerEvent()
        }

        reader.readAsText(file)
    }
})
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    updateEvents(elapsed * 1000, delta * 1000)
})
</script>

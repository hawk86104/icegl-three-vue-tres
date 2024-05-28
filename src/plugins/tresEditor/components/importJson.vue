<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:25:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-28 09:28:35
-->
<template></template>

<script lang="ts" setup>
import * as THREE from 'three'
import { exporterJsonZip, importJsonZip } from '../common/utils'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '../common/event'
import { makePluginZip } from '../common/makePlugin'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Pane } from 'tweakpane'
import { onMounted } from 'vue'
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
    unregisterEvent()
    group = new THREE.Group()
    if (value.children) {
        group.children = value.children
        scene.value.add(group)
        scene.value.background = value.background
        scene.value.environment = value.environment
        scene.value.fog = value.fog
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
    if (jsonData) {
        FMessage.warning?.({
            content: '先清空场景',
            colorful: true,
        })
        return
    }
    if (fileInput) {
        fileInput.accept = '.json'
        fileInput.value = null
        fileInput.click()
    }
})

const f1 = paneControl.addFolder({
    title: '分解场景[中间件 测试用]',
    expanded: false,
})
const btn = f1.addButton({
    title: '生成分解场景Zip',
    label: 'Json2Zip',
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
const importZipB = f1.addButton({
    title: '导入分解场景Zip',
    label: 'Zip2Json',
})
importZipB.on('click', () => {
    if (jsonData) {
        FMessage.warning?.({
            content: '先清空场景',
            colorful: true,
        })
    } else {
        if (fileInput) {
            fileInput.accept = '.zip'
            fileInput.value = null
            fileInput.click()
        }
    }
})
const pluginState = {
    orbitControls: true,
    gridHelper: true,
    pluginName: 'testEditor',
    childLevel: 1,
}
const f2 = paneControl.addFolder({
    title: 'TvT插件包',
})
f2.addBinding(pluginState, 'pluginName', {
    label: '插件名称',
})
f2.addBinding(pluginState, 'orbitControls', {
    label: '默认控制器',
})
f2.addBinding(pluginState, 'gridHelper', {
    label: '默认网格',
})
const exporterB = f2.addButton({
    title: '生成插件包',
    label: 'MakePlugin',
})
exporterB.on('click', () => {
    if (jsonData) {
        if (!pluginState.pluginName) {
            FMessage.warning?.({
                content: '请正确填写插件名称',
                colorful: true,
            })
        } else {
            makePluginZip(jsonData, pluginState)
        }
    } else {
        FMessage.warning?.({
            content: '场景内无物体',
            colorful: true,
        })
    }
})
const initSceneFromJsonData = (jd: any) => {
    jsonData = jd
    setScene(loader.parse(jsonData.scene))

    initEvents(renderer.value, scene.value, camera.value, sizes, jsonData)
    registerEvent()
}
onMounted(() => {
    fileInput = document.getElementById('fileInput')
    if (!fileInput) {
        return
    }
    fileInput.onchange = (event: any) => {
        const file = event.target.files[0]
        if (fileInput.accept === '.json') {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                const contents = e.target.result
                initSceneFromJsonData(JSON.parse(contents))
            }
            reader.readAsText(file)
        }
        if (fileInput.accept === '.zip') {
            importJsonZip(file, initSceneFromJsonData)
        }
    }
})
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    updateEvents(elapsed * 1000, delta * 1000)
})
</script>

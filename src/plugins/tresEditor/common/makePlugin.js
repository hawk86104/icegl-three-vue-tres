import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const codeForStructure = (code, project, camera, pluginState) => {
    // const cameraClone = camera ? JSON.parse(JSON.stringify(camera.object)) : null
    // delete cameraClone.uuid
    const { uuid, ...cameraObject } = camera.object
    const cameraClone = JSON.parse(JSON.stringify(camera))
    cameraClone.object = cameraObject
    return `
<template>
	<TresCanvas v-bind="state">
		${pluginState.orbitControls ? '<OrbitControls />' : ''}
		${camera ? `<Tres${camera.object.type}  ref="cameraRef" uuid="${camera.object.uuid}" name="${camera.object.name}" />` : ''}
		${code}
		${pluginState.gridHelper ? '<TresGridHelper />' : ''}
	</TresCanvas>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { reactive, watch, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import sceneCom from '../components/scene.vue'

const state = reactive({
	clearColor: '#201919',
	windowSize:true,
	shadows: ${project.shadows ? 'true' : 'false'},
	shadowMapType: ${project.shadowType ? project.shadowType : 'THREE.PCFShadowMap'},
	toneMapping: ${project.toneMapping ? project.toneMapping : 'THREE.NoToneMapping'},
	toneMappingExposure:${project.toneMappingExposure ? project.toneMappingExposure : '1'},
})

const cameraConfig = ${cameraClone ? `${JSON.stringify(cameraClone)}` : '{}'}
const loader = new THREE.ObjectLoader()
const cameraObject = loader.parse(cameraConfig)
const cameraRef = ref(null)
watch(
	() => cameraRef.value,
	(val) => {
			val.copy(cameraObject)
	},
)
</script>
	`
}
const codeForSence = (srcFolderComponents, pluginName) => {
    srcFolderComponents.file(
        `scene.vue`,
        `
	<template>
	<TresGroup ref="group" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { loadJson } from 'PLS/tresEditor'

const loader = new THREE.ObjectLoader()
const scene = await loadJson('./plugins/${pluginName}/json/scene.json')
const group = ref(null) as any
watch(
	() => group.value,
	(newVal) => {
			if (newVal) {
					newVal.add(loader.parse(scene))
			}
	},
)
</script>`,
    )
    return `<Suspense>
	<sceneCom />
</Suspense>`
}

const codeForConfig = (pluginName) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear() // 获取年份
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 获取月份（注意月份是从 0 开始的，需要加 1）
    const day = String(currentDate.getDate()).padStart(2, '0') // 获取日期
    const formattedDate = `${year}-${month}-${day}`

    return `
	export default {
		"name": "${pluginName}",
		"title": "编辑器导出的插件",
		"intro": "描述",
		"version": "0.0.1",
		"author": "作者名",
		"website": "站点地址",
		"state": "active",
		"creatTime": "${formattedDate}",
		"updateTime": "${formattedDate}",
		"require": [],
		"preview": [
			{ "src": "plugins/basic/base/preview/theBasic.png", "type": "img", "name": "index", "title": "实例" },
		]
	}`
}
export function makePluginZip(jsonData, pluginState) {
    const pluginName = 'testEditor'

    const zip = new JSZip()
    const publicFolder = zip.folder(`public/plugins/${pluginName}/json`)
    publicFolder.file(`scene.json`, JSON.stringify(jsonData.scene))
    const srcFolder = zip.folder(`src/plugins/${pluginName}`)
    srcFolder.file(`config.js`, codeForConfig(pluginName))
    const srcFolderComponents = srcFolder.folder('components')
    const pageCode = codeForStructure(codeForSence(srcFolderComponents, pluginName), jsonData.project, jsonData.camera, pluginState)
    const srcFolderPages = srcFolder.folder('pages')
    srcFolderPages.file('index.vue', pageCode)
    return zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${pluginName}.zip`)
    })
}

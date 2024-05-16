import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { getImageFormat } from './utils'
import { codeForEventScript } from './makePluginScripts'

const codeForStructure = (code, project, camera, pluginState) => {
    // const cameraClone = camera ? JSON.parse(JSON.stringify(camera.object)) : null
    // delete cameraClone.uuid
    const { uuid, ...cameraObject } = camera.object
    const cameraClone = JSON.parse(JSON.stringify(camera))
    cameraClone.object = cameraObject
    return `
<template>
    <loading />
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
import { loading2 as loading } from 'PLS/UIdemo'

const state = reactive({
	clearColor: '#201919',
	windowSize:true,
	antialias: true,
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
const codeForSence = (srcFolder, pluginName) => {
    srcFolder.file(
        `components/scene.vue`,
        `<template>
	<TresGroup ref="group" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { loadImageToBase64, loadJsonFile } from 'PLS/tresEditor'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import player from '../common/eventScript'
const { scene: tresScene, renderer, camera, sizes } = useTresContext()
player.init(tresScene, renderer, camera, sizes)

const loader = new THREE.ObjectLoader()
const scene = await loadJsonFile('./plugins/${pluginName}/json/scene.json')

if (scene.geometries) {
    for (const geometry of scene.geometries) {
        if (geometry.data && geometry.data.startsWith('url:')) {
            let url = geometry.data.slice(4)
            if (url.startsWith('geometries/')) {
                url = \`./plugins/${pluginName}/\${url}\`
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
                url = \`./plugins/${pluginName}/\${url}\`
            }
            image.url = await loadImageToBase64(url)
        }
    }
}

const group = ref(null) as any
watch(
	() => group.value,
	(newVal) => {
			if (newVal) {
					const sceneObject = loader.parse(scene)
					newVal.add(...sceneObject.children)
					tresScene.value.background = sceneObject.background
					tresScene.value.environment = sceneObject.environment
					tresScene.value.fog = sceneObject.fog
					player.load(sceneObject)
					player.play()
			}
	},
)
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    if (player.renderer) {
        player.render(elapsed * 1000, delta * 1000)
    }
})
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
const codeForJson = (publicFolder, scene) => {
    const geometrieList = []
    if (scene.geometries) {
        scene.geometries.forEach((geometry) => {
            if (geometry.type === 'BufferGeometry') {
                geometrieList.push({ uuid: geometry.uuid, data: geometry.data })
                geometry.data = `url:geometries/${geometry.uuid}.json`
            }
        })
    }
    const imagesList = []
    if (scene.images) {
        scene.images.forEach((image) => {
            if (image.url) {
                imagesList.push({ uuid: image.uuid, url: image.url })
                image.url = `url:images/${image.uuid}.${getImageFormat(image.url)}`
            }
        })
    }
    if (geometrieList.length) {
        const geometrieZip = publicFolder.folder('geometries')
        geometrieList.forEach((geometry) => {
            geometrieZip.file(`${geometry.uuid}.json`, JSON.stringify(geometry.data))
        })
    }
    if (imagesList.length) {
        const imagesZip = publicFolder.folder('images')
        imagesList.forEach((image) => {
            imagesZip.file(`${image.uuid}.${getImageFormat(image.url)}`, image.url.split(';base64,').pop(), { base64: true })
        })
    }
    publicFolder.file(`json/scene.json`, JSON.stringify(scene))
}
export function makePluginZip(jsonData, pluginState) {
    const pluginName = pluginState.pluginName

    const zip = new JSZip()
    const publicFolder = zip.folder(`public/plugins/${pluginName}`)
    codeForJson(publicFolder, jsonData.scene)
    const srcFolder = zip.folder(`src/plugins/${pluginName}`)
    srcFolder.file(`config.js`, codeForConfig(pluginName))
    const pageCode = codeForStructure(codeForSence(srcFolder, pluginName), jsonData.project, jsonData.camera, pluginState)
    srcFolder.file('pages/index.vue', pageCode)
    srcFolder.file('common/eventScript.js', codeForEventScript(jsonData.scripts))
    return zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${pluginName}.zip`)
    })
}

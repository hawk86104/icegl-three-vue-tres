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
export function makePluginZip(jsonData, pluginState) {
    console.log(jsonData)
    const pageCode = codeForStructure('', jsonData.project, jsonData.camera, pluginState)
    console.log(pageCode)
    debugger
}

<template></template>

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import HolographicMaterial from '../../common/HolographicMaterial'
import { resetUV } from '../../common/utils'
import { Color, DoubleSide, AdditiveBlending } from 'three'

const props = withDefaults(defineProps<{
	group: any
}>(), {
})

const PARAMS = {
	fresnelAmount: 0,
	fresnelOpacity: 0.0,
	scanlineSize: 15,
	signalSpeed: 1.3,
	hologramColor: "#e05b0f",
}
const holoMaterial = new HolographicMaterial({ blendMode: AdditiveBlending, hologramBrightness: 2.5, side: DoubleSide })
holoMaterial.uniforms.fresnelAmount.value = PARAMS.fresnelAmount
holoMaterial.uniforms.scanlineSize.value = PARAMS.scanlineSize
holoMaterial.uniforms.signalSpeed.value = PARAMS.signalSpeed
holoMaterial.uniforms.fresnelOpacity.value = PARAMS.fresnelOpacity
holoMaterial.uniforms.hologramColor.value = new Color(PARAMS.hologramColor)
holoMaterial.uniforms.enableBlinking.value = false
holoMaterial.depthTest = true

//关键建筑物 
let shzx, jmds, dfmzt = null
const setImportantBuilds = () => {

	const hqjrzx = props.group.getObjectByName('02-huanqiujinrongzhongxin_huanqiujinrongzhongxin_0')
	hqjrzx.name = '环球金融中心'
	hqjrzx.material.dispose()
	resetUV(hqjrzx.geometry)
	hqjrzx.material = holoMaterial

	shzx = props.group.getObjectByName('01-shanghaizhongxindasha_shanghaizhongxindasha_0')
	shzx.name = '上海中心'
	shzx.material.dispose()
	resetUV(shzx.geometry)
	shzx.material = holoMaterial.clone()
	shzx.material.uniforms.hologramColor.value = new Color('#006cf9')
	shzx.material.uniforms.fresnelAmount.value = 1
	shzx.material.uniforms.scanlineSize.value = 2.1
	shzx.material.uniforms.signalSpeed.value = 0.4

	jmds = props.group.getObjectByName('03-jinmaodasha_jjinmaodasha_0')
	jmds.name = '金茂大厦'
	jmds.material.dispose()
	resetUV(jmds.geometry)
	jmds.material = holoMaterial.clone()
	jmds.material.uniforms.hologramColor.value = new Color('#5e0fe0')
	jmds.material.uniforms.scanlineSize.value = 15
	jmds.material.uniforms.signalSpeed.value = 0.18

	dfmzt = props.group.getObjectByName('04-dongfangmingzhu_dongfangmingzhu_0')
	dfmzt.name = '东方明珠塔'
	dfmzt.material.dispose()
	resetUV(dfmzt.geometry)
	dfmzt.material = holoMaterial.clone()
	dfmzt.material.uniforms.scanlineSize.value = 5.
	dfmzt.material.uniforms.signalSpeed.value = 1.3
	dfmzt.material.uniforms.hologramColor.value = new Color('#e00f0f')
	dfmzt.material.uniforms.fresnelOpacity.value = 0.1
	// dfmzt.material.transparent = true
	// dfmzt.material.opacity = 0.16
	// const newMeshGeometry = dfmzt.geometry.clone()
	// resetUV(newMeshGeometry)
	// const newMesh = new Mesh(newMeshGeometry, holoMaterial.clone())
	// newMesh.material.uniforms.scanlineSize.value = 5.
	// newMesh.material.uniforms.signalSpeed.value = 1.3
	// newMesh.material.uniforms.hologramColor.value = new Color('#384400')
	// newMesh.material.uniforms.fresnelOpacity.value = 0.1
	// reAnchorCenter(newMesh)
	// newMesh.scale.set(1.006, 1.006, 1.00)
	// newMesh.translateZ(100)
	// dfmzt.add(newMesh)
}
setImportantBuilds()

const { onLoop } = useRenderLoop()
onLoop(() => {
	holoMaterial.update()
	shzx.material.update()
	jmds.material.update()
	dfmzt.material.update()
})

// import { Pane } from 'tweakpane'
// const paneControl = new Pane({
// 	title: '效果参数',
// 	expanded: true,
// })
// paneControl.addBinding(PARAMS, 'fresnelAmount', {
// 	min: 0,
// 	max: 1,
// 	step: 0.01,
// }).on('change', (ev) => {
// 	holoMaterial.uniforms.fresnelAmount.value = ev.value
// })
// paneControl.addBinding(PARAMS, 'scanlineSize', {
// 	min: 1,
// 	max: 15,
// 	step: 0.1,
// }).on('change', (ev) => {
// 	holoMaterial.uniforms.scanlineSize.value = ev.value
// })
// paneControl.addBinding(PARAMS, 'signalSpeed', {
// 	min: 0,
// 	max: 1,
// 	step: 0.01,
// }).on('change', (ev) => {
// 	holoMaterial.uniforms.signalSpeed.value = ev.value
// })
// paneControl.addBinding(PARAMS, 'fresnelOpacity', {
// 	min: 0,
// 	max: 1,
// 	step: 0.1,
// }).on('change', (ev) => {
// 	holoMaterial.uniforms.fresnelOpacity.value = ev.value
// })
// paneControl.addBinding(PARAMS, 'hologramColor', { label: '圈颜色' }).on('change', (ev) => {
// 	holoMaterial.uniforms.hologramColor.value = new Color(ev.value)
// })
</script>

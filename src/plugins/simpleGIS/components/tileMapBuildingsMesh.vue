<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-29 10:48:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 15:31:17
-->
<template>
	<primitive :object="map" :rotation="[-Math.PI / 2, 0, 0]" />
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, reactive, ref } from 'vue'
import { Map, PlaneProvider, MapProvider, TerrainMeshProvider, UTM, MartiniTerrainProvider } from '../lib/threeSatelliteMap/index'

const props = withDefaults(defineProps<{
	bbox?: Array<number>
	maxZoom?: number
	mapCenter: Array<number>
	camera: THREE.PerspectiveCamera
}>(), {
	bbox: [104.955976, 20.149765, 120.998419, 30.528687],
	maxZoom: 20,
})

const { renderer, scene } = useTresContext()

const planProvider = new PlaneProvider()
planProvider.coordType = UTM

// const martiniProvider = new MartiniTerrainProvider()
// martiniProvider.source = 'https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp';
// // martiniProvider.source = 'http://tile.writter.com.cn/tiles/[z]/[x]/[y]/terrain.webp'
// martiniProvider.coordType = UTM

const mapProvider = new MapProvider()
// mapProvider.source = 'https://mts2.google.com/vt/lyrs=s&hl=zh-CN&x=[x]&y=[y]&z=[z]'
// mapProvider.source = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x=[x]&y=[y]&z=[z]'
mapProvider.source = 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
// mapProvider.source = 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
mapProvider.showTileNo = false
mapProvider.useWorker = true
// mapProvider.debug = true

const meshProvider = new TerrainMeshProvider(planProvider, mapProvider)
meshProvider.showBoundingBox = false
meshProvider.wireframe = false
meshProvider.flatShading = false
//滤镜效果
meshProvider.filter = {
	opposite: true,
	genBright: 1.3,
	genContrast: 1,
	genSaturation: 1,
}
let color = new THREE.Color('#4688b5')
meshProvider.filter.monochrome = {
	r: color.r,
	g: color.g,
	b: color.b,
}

const map = new Map()
map.provider = meshProvider
// map.matrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), - Math.PI / 2))
// map.applyMatrix4(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2))
// map.updateMatrix()

map.bbox = props.bbox
map.maxZoom = props.maxZoom

props.camera.up = new THREE.Vector3(0, 1, 0)
props.camera.position.set(props.mapCenter[0], props.mapCenter[2], -props.mapCenter[1] + 2000)
props.camera.lookAt(new THREE.Vector3(props.camera.position.x, 0, props.camera.position.z - 3000))
map.camera = props.camera

let orbitControl = null as any
watchEffect(() => {
	if (renderer.value) {
		orbitControl = new OrbitControls(props.camera, renderer.value.domElement)
		orbitControl.enableDamping = true
		orbitControl.dampingFactor = 0.05
		orbitControl.minDistance = 600 //避免 在搞得地图瓦片情况下 太近不显示瓦片的问题
		orbitControl.position0.set(props.camera.position.x, props.camera.position.y, props.camera.position.z)
		orbitControl.target.set(props.camera.position.x, 0, props.camera.position.z - 2000)
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (renderer.value) {
		const far = Math.abs(props.camera.position.y) * 50
		props.camera.far = far + 5000
		props.camera.updateProjectionMatrix()

		if (orbitControl) {
			orbitControl.update()
			orbitControl.target.y = 0
		}
		map.update()
		renderer.value.render(scene.value, props.camera)
	}

})

defineExpose({
	camera: props.camera, map
})
</script>
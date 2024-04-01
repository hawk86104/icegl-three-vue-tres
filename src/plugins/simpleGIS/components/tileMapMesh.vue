<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-01 14:36:26
-->
<template>
	<primitive :object="map" :rotation="[-Math.PI / 2, 0, 0]" />
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, watch } from 'vue'
import { Map, PlaneProvider, MapProvider, TerrainMeshProvider, MERC, MartiniTerrainProvider } from '../lib/threeSatelliteMap/index'

const props = withDefaults(defineProps<{
	bbox?: Array<number>
	maxZoom?: number
	opposite?: boolean
	genBright?: number
	genContrast?: number
	genSaturation?: number
	monochrome?: string
	isMonochrome?: boolean
	mapCenter: Array<number>
}>(), {
	bbox: [104.955976, 20.149765, 120.998419, 30.528687],
	maxZoom: 20,
	opposite: false,	//反色
	genBright: 1.0,	//高亮
	genContrast: 1.0,	//对比度
	genSaturation: 1.0,	//饱和度
	monochrome: '#fff',	//单色滤镜
	isMonochrome: false,	//是否启用单色滤镜
})

const { renderer, scene } = useTresContext()

const planProvider = new PlaneProvider()
planProvider.coordType = MERC

const martiniProvider = new MartiniTerrainProvider()
martiniProvider.source = 'https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp';
// martiniProvider.source = 'http://tile.writter.com.cn/tiles/[z]/[x]/[y]/terrain.webp'
martiniProvider.coordType = MERC

const mapProvider = new MapProvider()
// mapProvider.source = 'https://mts2.google.com/vt/lyrs=s&hl=zh-CN&x=[x]&y=[y]&z=[z]'
// mapProvider.source = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x=[x]&y=[y]&z=[z]'
mapProvider.source = 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
// mapProvider.source = 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
mapProvider.showTileNo = false
mapProvider.useWorker = true

const meshProvider = new TerrainMeshProvider(martiniProvider, mapProvider)
meshProvider.showBoundingBox = false
meshProvider.wireframe = false
meshProvider.flatShading = false
meshProvider.useStandardMaterial = false
meshProvider.filter = {
	opposite: props.opposite,
	monochrome: props.isMonochrome ? {
		r: 0.299,
		g: 0.587,
		b: 0.114,
	} : null,	//单色滤镜
	genBright: props.genBright,	//高亮
	genContrast: props.genContrast,	//对比度
	genSaturation: props.genSaturation,	//饱和度
}
// meshProvider.filter = null
if (props.monochrome) {
	let color = new THREE.Color(props.monochrome)
	if (meshProvider.filter) {
		meshProvider.filter.monochrome = {
			r: color.r,
			g: color.g,
			b: color.b,
		}
	}
}

const map = new Map()
map.provider = meshProvider

map.bbox = props.bbox
map.maxZoom = props.maxZoom

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1e7 * 10)
camera.up = new THREE.Vector3(0, 1, 0)
camera.position.set(props.mapCenter[0], props.mapCenter[2], -props.mapCenter[1])
camera.lookAt(new THREE.Vector3(camera.position.x, 0, camera.position.z - 2000))
map.camera = camera

let orbitControl = null as any
watchEffect(() => {
	if (renderer.value && !orbitControl) {
		orbitControl = new OrbitControls(camera, renderer.value.domElement)
		orbitControl.enableDamping = true
		orbitControl.dampingFactor = 0.05
		orbitControl.minDistance = 600 //避免 在搞得地图瓦片情况下 太近不显示瓦片的问题
		orbitControl.position0.set(camera.position.x, camera.position.y, camera.position.z)
		orbitControl.target.set(camera.position.x, 0, camera.position.z - 2000)
	}
	if (props.genBright && meshProvider.filter) {
		meshProvider.filter.genBright = props.genBright
	}
	if (props.genContrast && meshProvider.filter) {
		meshProvider.filter.genContrast = props.genContrast
	}
	if (props.genSaturation && meshProvider.filter) {
		meshProvider.filter.genSaturation = props.genSaturation
	}
	if (props.isMonochrome && props.monochrome && meshProvider.filter) {
		let color = new THREE.Color(props.monochrome)
		meshProvider.filter.monochrome = {
			r: color.r,
			g: color.g,
			b: color.b,
		}
	}
})

watch(() => props.opposite, (value) => {
	if (meshProvider.filter) {
		meshProvider.filter.opposite = value
	}
})
watch(() => props.isMonochrome, (value) => {
	let color = new THREE.Color(props.monochrome)
	if (meshProvider.filter) {
		meshProvider.filter.monochrome = value ? {
			r: color.r,
			g: color.g,
			b: color.b,
		} : null
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (renderer.value) {
		TWEEN.update()
		if (orbitControl) {
			orbitControl.update()
		}
		map.update()

		const far = Math.abs(camera.position.y) * 50
		camera.far = far + 5000
		camera.updateProjectionMatrix()
		orbitControl.target.y = 0
		renderer.value.render(scene.value, camera)
	}

})


defineExpose({
	camera, map, orbitControl
})

</script>
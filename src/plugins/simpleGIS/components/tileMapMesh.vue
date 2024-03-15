<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-15 22:10:10
-->
<template>
	<OrbitControls v-bind="controlsState" ref="orbitControlRef" />
	<primitive :object="map" :rotation="[-Math.PI / 2, 0, 0]" />
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, reactive, ref, watch } from 'vue'
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
const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
})
const orbitControlRef = ref()
const { camera, renderer, scene } = useTresContext()

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
meshProvider.flatShading = true
meshProvider.useStandardMaterial = true
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
if (props.monochrome) {
	let color = new THREE.Color(props.monochrome)
	meshProvider.filter.monochrome = {
		r: color.r,
		g: color.g,
		b: color.b,
	}
}

const map = new Map()
map.provider = meshProvider

map.bbox = props.bbox
map.maxZoom = props.maxZoom

let firstCamera = false
let firstOrbitControlRef = false
watchEffect(() => {
	if (camera.value && !firstCamera) {
		firstCamera = true
		map.camera = camera.value
	}
	if (orbitControlRef.value && !firstOrbitControlRef) {
		firstOrbitControlRef = true
		orbitControlRef.value.value.target.x = camera.value.position.x
		orbitControlRef.value.value.target.y = 0
		orbitControlRef.value.value.target.z = camera.value.position.z
	}
	if (props.genBright) {
		meshProvider.filter.genBright = props.genBright
	}
	if (props.genContrast) {
		meshProvider.filter.genContrast = props.genContrast
	}
	if (props.genSaturation) {
		meshProvider.filter.genSaturation = props.genSaturation
	}
	if (props.isMonochrome && props.monochrome) {
		let color = new THREE.Color(props.monochrome)
		meshProvider.filter.monochrome = {
			r: color.r,
			g: color.g,
			b: color.b,
		}
	}
})

watch(() => props.opposite, (value) => {
	meshProvider.filter.opposite = value
})
watch(() => props.isMonochrome, (value) => {
	let color = new THREE.Color(props.monochrome)
	meshProvider.filter.monochrome = value ? {
		r: color.r,
		g: color.g,
		b: color.b,
	} : null
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (renderer.value) {
		const far = Math.abs(camera.value.position.y) * 50
		camera.value.far = far + 5000
		camera.value.updateProjectionMatrix()

		if (orbitControlRef.value) {
			orbitControlRef.value.value.target.y = 0
		}
		map.update()
		renderer.value.render(scene.value, camera.value)
	}

})

</script>
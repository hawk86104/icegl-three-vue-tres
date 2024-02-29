<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-29 10:48:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-29 18:50:25
-->
<template>
	<OrbitControls v-bind="controlsState" ref="orbitControlRef" />
	<primitive :object="map" />
</template>

<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, reactive, ref } from 'vue'
import { Map, PlaneProvider, MapProvider, TerrainMeshProvider, UTM, MartiniTerrainProvider } from '../lib/threeSatelliteMap/index'

const props = withDefaults(defineProps<{
	bbox?: Array<number>
	maxZoom?: number
}>(), {
	bbox: [104.955976, 20.149765, 120.998419, 30.528687],
	maxZoom: 20,
})
const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
})
const orbitControlRef = ref()
const { camera, renderer, scene } = useTresContext()

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
//滤镜效果
mapProvider.filter = 'invert(100%) hue-rotate(321deg) grayscale(80%) brightness(120%)'
// mapProvider.debug = true

const meshProvider = new TerrainMeshProvider(planProvider, mapProvider)
meshProvider.showBoundingBox = false
meshProvider.wireframe = false
meshProvider.flatShading = false

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

		// camera.value.lookAt(0, 0, 0)
		// camera.value.position.x += 200
		// camera.value.position.y -= 200
		// camera.value.position.z = 600

		orbitControlRef.value.value.target.x = camera.value.position.x
		orbitControlRef.value.value.target.y = camera.value.position.y
		orbitControlRef.value.value.target.z = 0

		// camera.value.position.x = 187083.29118444995
		// camera.value.position.y = 2493066.0481375763
		// camera.value.position.z = 919.9993174713077

		// camera.value.rotation.x = 0.5773496316950935
		// camera.value.rotation.y = 0.35860567370955987
		// camera.value.rotation.z = 0.4942056703070541
		// map.camera = camera.value
		// orbitControlRef.value.value.target.x = 186088.2115110314
		// orbitControlRef.value.value.target.y = 2494148.892637813
		// orbitControlRef.value.value.target.z = -0.000018780958164596405
	}
})

const { onLoop } = useRenderLoop()
onLoop(() => {
	if (renderer.value) {
		const far = Math.abs(camera.value.position.z) * 50
		camera.value.far = far + 5000
		camera.value.updateProjectionMatrix()

		if (orbitControlRef.value) {
			orbitControlRef.value.value.target.z = 0
		}
		map.update()
		renderer.value.render(scene.value, camera.value)
	}

})

</script>
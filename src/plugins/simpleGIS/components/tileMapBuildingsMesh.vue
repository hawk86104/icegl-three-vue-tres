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
		orbitControlRef.value.value.target.x = camera.value.position.x
		orbitControlRef.value.value.target.y = camera.value.position.y
		orbitControlRef.value.value.target.z = 0
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
<template>
	<!-- <OrbitControls v-bind="controlsState" :target="orbitControlPostion" /> -->
	<primitive :object="map" />
</template>

<script lang="ts" setup>
// import { OrbitControls } from '@tresjs/cientos'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, reactive, ref } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Map, PlaneProvider, MapProvider, TerrainMeshProvider, UTM, MartiniTerrainProvider } from '../lib/threeSatelliteMap/index'
import * as THREE from "three"

const props = withDefaults(defineProps<{
	bbox?: Array<number>
	maxZoom?: number
}>(), {
	bbox: [104.955976, 20.149765, 120.998419, 30.528687],
	maxZoom: 20,
})

// const controlsState = reactive({
// 	enableDamping: true,
// 	dampingFactor: 0.05,
// })
// const orbitControlPostion = ref([666975.9502699381, 3547712.254078843, 0])
// const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1e7 * 10)
// camera.up = new THREE.Vector3(0, 0, 1)
// camera.position.set(666975.9502699381, 3547712.254078843, 13137.654582887653)
// camera.lookAt(666975.9502699381, 3547712.254078843, 0)

const { camera, renderer, scene } = useTresContext()

const planProvider = new PlaneProvider()
planProvider.coordType = UTM

const martiniProvider = new MartiniTerrainProvider()
martiniProvider.source = 'https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp';
// martiniProvider.source = 'http://tile.writter.com.cn/tiles/[z]/[x]/[y]/terrain.webp'
martiniProvider.coordType = UTM

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

const map = new Map()
map.provider = meshProvider

map.bbox = props.bbox
map.maxZoom = props.maxZoom
// map.camera = camera

let controls = null
let firstXamera = false
watchEffect(() => {
	if (camera.value && !firstXamera) {
		firstXamera = true
		camera.value.up = new THREE.Vector3(0, 0, 1)
		camera.value.position.set(666975.9502699381, 3547712.254078843, 13137.654582887653)
		camera.value.lookAt(666975.9502699381, 3547712.254078843, 0)

		map.camera = camera.value
		controls = new OrbitControls(camera.value, renderer.value.domElement)

		controls.position0.set(666975.9502699381, 3547712.254078843, 13137.654582887653)
		controls.target.set(666975.9502699381, 3547712.254078843, 0)
		console.log('watchEffect', map.camera)
	}
})
let lastRotation = [0, 0, 0]

const { onLoop } = useRenderLoop()
onLoop(() => {

	if (renderer.value && controls) {
		debugger
		controls.update()

		// const far = Math.abs(camera.value.position.z) * 50
		// camera.value.far = far + 5000
		// camera.value.updateProjectionMatrix()
		// if (lastRotation[0] === camera.value.rotation.x && lastRotation[1] === camera.value.rotation.y && lastRotation[2] === camera.value.rotation.z) {
		// 	orbitControlPostion.value = [camera.value.position.x, camera.value.position.y, 0]
		// }
		// lastRotation = [camera.value.rotation.x, camera.value.rotation.y, camera.value.rotation.z]

		map.update()
		renderer.value.render(scene.value, camera.value)
	}

})

</script>
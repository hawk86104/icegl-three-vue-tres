
<template>
	<TresGroup>
		<TresMesh v-for="(item, index) in meshList" :key="`${index}`">
			<TresBufferGeometry ref="tbgRef" :position="[item.positionArray, 3]" :faceUv="[item.uvArray, 2]"
				:normal="[item.normalArray, 3]" />
			<TresShaderMaterial v-bind="tsMaterialConfig" />
		</TresMesh>
	</TresGroup>
</template>

<script lang="ts" setup>
import { loadGeojson } from 'PLS/digitalCity/common/utils'
import { watchEffect, reactive } from 'vue'
import vertexShader from '../shaders/buildingModels.vert?raw'
import fragmentShader from '../shaders/buildingModels.frag?raw'
import { useMapStore } from '../stores/mapStore'
import { useRenderLoop } from '@tresjs/core'
const mapStore = useMapStore()

const mercatorTolonlat = (mercatorX: number, mercatorY: number) => {
	let x = mercatorX / 20037508.34 * 180
	let y = mercatorY / 20037508.34 * 180
	y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2)

	return [x, y]
}

const transP = (arr: Array<number>) => {
	for (let i = 0; i < arr.length; i += 3) {
		const s = mercatorTolonlat(-arr[i + 1], arr[i])
		const setOff = [94.543003732751, -32.609545529905]
		s[0] += setOff[0]
		s[1] += setOff[1]
		const outP = mapStore.mapHandle.customCoords.lngLatToCoord(s)
		arr[i] = outP[0]
		arr[i + 1] = outP[1]
	}
}
const transP2 = (arr: Array<number>) => {
	for (let i = 0; i < arr.length; i += 3) {
		const s = mercatorTolonlat(arr[i], -arr[i + 1])

		const setOff = [37.897343966054, 5.254557743993]
		s[0] += setOff[0]
		s[1] += setOff[1]
		const outP = mapStore.mapHandle.customCoords.lngLatToCoord(s)
		arr[i] = outP[0]
		arr[i + 1] = outP[1]
	}
}
const transP3 = (arr: Array<number>) => {
	for (let i = 0; i < arr.length; i += 3) {
		const s = [arr[i], arr[i + 1]]
		const outP = mapStore.mapHandle.customCoords.lngLatToCoord(s)
		arr[i] = outP[0]
		arr[i + 1] = outP[1]
		arr[i + 2] = arr[i + 2]*0.2
	}
}

const meshList = reactive([] as any)
const markBuildingsPrimary = async () => {
	const buildingsPrimary = await loadGeojson('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/json/AMapGIS/latlngbuildings.geojson', 'buildings')
	for (let index = 0; index < buildingsPrimary.length; index++) {
		const element = buildingsPrimary[index]
		transP3(element.geometry)
		const positionArray = new Float32Array(element.geometry)
		const uvArray = new Float32Array(element.faceUv)
		const normalArray = new Float32Array(element.geometry.length)
		meshList.push({ positionArray, uvArray, normalArray })
	}
}
const tsMaterialConfig = {
	uniforms: {
		u_opacity: { value: 1.0 },
		u_time: { value: 0.45 },
		u_color: { value: [0.02, 0.15, 0.5, 1] },
		u_zoom: { value: 1.0 },
		u_brightColor: { value: [1, 1, 1, 1] }, // 顶线和亮色
		u_windowColor: { value: [0.07, 0.07, 0.03, 1] },
		u_near: { value: 1 },
		u_far: { value: 1000 },
	},
	vertexShader,
	fragmentShader,
}

watchEffect(() => {
	if (mapStore.cameraState) {
		markBuildingsPrimary()
	}
})
const { onLoop } = useRenderLoop()
onLoop(() => {
	if (mapStore.cameraState) {
		tsMaterialConfig.uniforms.u_zoom.value = mapStore.mapHandle.getZoom()
		tsMaterialConfig.uniforms.u_near.value = mapStore.cameraState.near
		tsMaterialConfig.uniforms.u_far.value = mapStore.cameraState.far
	}
})
</script>

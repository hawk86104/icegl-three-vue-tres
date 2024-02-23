<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 13:47:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 12:32:43
-->
<template>
	<div id="mapContainer"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted } from "vue"
import { useMapStore } from '../stores/mapStore'

const props = withDefaults(defineProps<{
	center?: Array<Number>
	zoom?: Number
	pitch?: Number
	mapStyle?: String
}>(), {
	center: [0, 0],
	zoom: 14,
	pitch: 50,
	mapStyle: 'normal',
})

const mapStore = useMapStore()
let map = null
onMounted(async () => {
	await AMapLoader.load({
		key: "0c7222955570f1b434c4adfcc1e955e8", //可自行修改成自己得高德API key
		version: "2.0",
	})
		.then((_AMap) => {
			map = new _AMap.Map('mapContainer', {
				center: props.center,
				zooms: [1, 20],
				viewMode: '3D',
				zoom: props.zoom,
				pitch: props.pitch,
				mapStyle: 'amap://styles/'+props.mapStyle,
			})
			map.on('click', (e) => {
				const text = `您在 [ ${e.lnglat.getLng()},${e.lnglat.getLat()} ] 的位置单击了地图！`
				console.log(text)
			})
			mapStore.$patch({ aMap: _AMap })
			mapStore.$patch({ mapHandle: map })
		})
		.catch((e) => {
			console.log(e)
		})
})

</script>

<style lang="less" scoped>
#mapContainer {
	height: 100vh;
}
</style>
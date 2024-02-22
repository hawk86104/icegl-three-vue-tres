<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 13:47:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 09:18:32
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
}>(), {
	center: [0, 0]
})

const mapStore = useMapStore()
let map = null
onMounted(async () => {
	await AMapLoader.load({
		key: "0c7222955570f1b434c4adfcc1e955e8",
		version: "2.0",
	})
		.then((_AMap) => {
			map = new _AMap.Map('mapContainer', {
				center: props.center,
				zooms: [2, 20],
				zoom: 14,
				viewMode: '3D',
				pitch: 50,
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
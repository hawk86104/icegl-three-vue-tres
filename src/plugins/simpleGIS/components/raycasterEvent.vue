<template>
	<div class="lonLatDiv">
		lon:{{ lonLat[0] }} lat:{{ lonLat[1] }}
	</div>
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults, watch } from 'vue'
import { webMercatorToLonLat, utmToLonLat, UTM } from '../lib/threeSatelliteMap/index'
import * as THREE from 'three'

const props = withDefaults(defineProps<{
	tileMapRef: any
}>(), {
})

const lonLat = ref([0, 0])
watch(() => props.tileMapRef, (newVal, oldVal) => {
	if (!oldVal && newVal) {
		console.log('raycasterEvent:', newVal)
		var raycaster = new THREE.Raycaster()
		var mouse = new THREE.Vector2()

		document.addEventListener('mousemove', onMouseMove, false)

		function onMouseMove(event: any) {
			// 计算鼠标的归一化设备坐标
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1
			mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

			// 更新射线投射器的起点
			raycaster.setFromCamera(mouse, newVal.camera)

			// 计算射线投射器与物体的相交情况
			var intersects = raycaster.intersectObjects(newVal.map.children)

			if (intersects.length > 0) {
				// 获取第一个相交物体的坐标
				var intersection = intersects[0];
				// console.log('全局坐标:', intersection.point)

				if (newVal.map.provider.geometryProvider.coordType === UTM) {
					lonLat.value = utmToLonLat(intersection.point.x, -intersection.point.z)
				} else {
					lonLat.value = webMercatorToLonLat(intersection.point.x, -intersection.point.z)
				}

				lonLat.value[0] = lonLat.value[0].toFixed(4) as any
				lonLat.value[1] = lonLat.value[1].toFixed(4) as any
				// console.log('lonLat:', lonLat.value)

				// 将全局坐标转换为局部坐标
				// var localIntersection = cube.worldToLocal(intersection.point.clone())
				// console.log('局部坐标:', localIntersection)
			}
		}
	}
})

</script>
<style lang="less" scoped>
.lonLatDiv {
	position: absolute;
	bottom: 6px;
	color: white;
	left: calc(50% - 6.5em);
	font-size: 10px;
	background-color: #0000008c;
	padding: 2px 4px;
}
</style>
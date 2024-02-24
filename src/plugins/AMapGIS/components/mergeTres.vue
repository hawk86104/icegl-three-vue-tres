<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 14:17:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 13:13:04
-->
<template></template>
<script setup>
import { watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import { useMapStore } from '../stores/mapStore'

const props = defineProps({
	center: {
		default: [0, 0]
	}
})

const { camera, scene, renderer } = useTresContext()
const mapStore = useMapStore()
let customCoords = null
let customLayer = null
watchEffect(() => {
	if (mapStore.aMap) {
		// renderer.value.autoClear = false
		customCoords = mapStore.mapHandle.customCoords
		customLayer = new mapStore.aMap.CustomLayer(renderer.value.domElement, {
			zIndex: 10,
			render: () => {
				renderer.value.resetState()
				customCoords.setCenter(props.center)
				const { near, far, fov, up, lookAt, position } =
					customCoords.getCameraParams()
				// 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
				camera.value.near = near
				camera.value.far = far
				camera.value.fov = fov
				mapStore.$patch({
					cameraState: {
						near, far, fov, position
					}
				})
				camera.value.position.set(...position)
				camera.value.up.set(...up)
				camera.value.lookAt(...lookAt)
				camera.value.updateProjectionMatrix()
				renderer.value.render(scene.value, camera.value)
				renderer.value.resetState()
			},
			alwaysRender: true
		})
		mapStore.mapHandle.add(customLayer)
	}
})
</script>
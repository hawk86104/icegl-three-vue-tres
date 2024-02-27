<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-27 10:02:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-27 11:35:30
-->
<template>
	<TresGroup>
		<primitive :object="tiles.group" />
	</TresGroup>
</template>

<script lang="ts" setup>
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect } from 'vue'
import { TilesRenderer } from '3d-tiles-renderer'
import * as THREE from 'three'

const tiles = new TilesRenderer('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/3Dtiles/simpleGIS/data/tileset.json')
tiles.errorTarget = 0
const onLoadModel = (scene) => {
	scene.traverse(c => {
		if (c.isMesh) {
			c.material.side = 2
			c.receiveShadow = false
			c.castShadow = false
		}
	})

	// 对齐 tiles center
	const box = new THREE.Box3()
	const sphere = new THREE.Sphere()
	if (tiles.getBoundingBox(box)) {
		box.getCenter(tiles.group.position)
		tiles.group.position.multiplyScalar(- 1)
	} else if (tiles.getBoundingSphere(sphere)) {
		tiles.group.position.copy(sphere.center)
		tiles.group.position.multiplyScalar(- 1)
	}
}
tiles.onLoadModel = onLoadModel

const { camera, renderer, sizes } = useTresContext()
watchEffect(() => {
	if (sizes.width.value) {
		tiles.setCamera(camera.value)
		tiles.setResolutionFromRenderer(camera.value, renderer.value)
	}
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
	if (camera.value && sizes.width.value) {
		camera.value.updateMatrixWorld()
		tiles.update()
	}
})

</script>
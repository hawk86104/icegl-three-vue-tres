<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-28 14:45:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-29 08:30:56
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
import { onLoadTileSetForCesium3Dtitles } from '../lib/utils'

const tiles = new TilesRenderer('https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/no.json') //tileset 如果使用cesium 的tilies带tranfrom的 请把root的tranfrom去除
tiles.errorTarget = 2
tiles.onLoadModel = (scene: any) => {
	scene.traverse(c => {
		if (c.isMesh) {
			c.receiveShadow = false
			c.castShadow = false
		}
	})
}
onLoadTileSetForCesium3Dtitles(tiles)

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
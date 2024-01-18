<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 15:29:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-13 13:04:25
-->

<template>
	<TresGroup :rotate-x="-Math.PI / 2">
		<primitive :object="floor" :scale="3.0" receive-shadow />
		<Suspense>
			<Text3D text="DFS 230A-1 新型滑翔机" :position="[-145, -265, 2]" v-bind="t3dConfig" cast-shadow
				font="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/fonts/FZLanTingHeiS-UL-GB_Regular.json" center>
			</Text3D>
		</Suspense>
	</TresGroup>
</template>

<script setup lang="ts">
import { useGLTF, Text3D } from '@tresjs/cientos'

const { nodes } = await useGLTF(
	'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/floor/redTextFloor/scene.gltf', { draco: true, decoderPath: './draco/' })

console.log(nodes)
const floor = nodes.Sketchfab_model.getObjectByName('floor_grid_07_-_Default_0')

const t3dConfig = {
	size: 16,
	height: 3,
	curveSegments: 5,
	bevelEnabled: true,
	bevelThickness: 0.05,
	bevelSize: 0.12,
	bevelOffset: 0.2,
	bevelSegments: 4,
}

</script>
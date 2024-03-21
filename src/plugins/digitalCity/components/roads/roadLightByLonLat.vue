<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-18 20:49:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:46:54
-->
<script setup lang="ts">
import { useRenderLoop, useTexture } from '@tresjs/core'
import { CatmullRomCurve3, Vector3, RepeatWrapping, BackSide } from 'three'
import { loadGeojson } from '../../common/utils'
import { lonLatToUtm } from 'PLS/simpleGIS/lib/threeSatelliteMap/index'

const props = withDefaults(
	defineProps<{
		geoJson: string
		color?: string
		radius?: number
		speed?: number
	}>(),
	{
		color: '#ffff00',
		radius: 2,
		speed: 1.0
	},
)

const { map: pTexture } = await useTexture({
	map: './plugins/digitalCity/image/line.png'
})
pTexture.needsUpdate = true
pTexture.wrapS = pTexture.wrapT = RepeatWrapping
pTexture.repeat.set(1, 1)

const linePrimary = await loadGeojson(props.geoJson)

let curve = [] as any
for (var i = 0; i < linePrimary.length; i++) {
	const item = linePrimary[i]
	const points = [] as Vector3[]
	item.geometry.coordinates.forEach((lineOne: any) => {
		const onePoint = lonLatToUtm(lineOne[0], lineOne[1], 50)
		points.push(new Vector3(onePoint[0], 0, -onePoint[1]))
	})
	let oneColor = props.color
	if (item.properties.highway === 'primary') {
		oneColor = '#7eff10'
	} else if (item.properties.highway === 'tertiary') {
		oneColor = '#0eeeee'
	} else if (item.properties.highway === 'secondary') {
		oneColor = '#ffffff'
	} else {
		oneColor = '#ff0ffe'
	}
	curve.push({ cr3: new CatmullRomCurve3(points), color: oneColor })
}

const { onLoop } = useRenderLoop()
onLoop(() => {
	pTexture.offset.x -= Math.random() / 20 * props.speed
})

</script>

<template>
	<TresGroup>
		<TresMesh v-for="(item) in curve" :renderOrder="3000">
			<TresTubeGeometry :args="[item.cr3, 64, props.radius, 20/*管道圆润*/, false]" />
			<TresMeshBasicMaterial :map="pTexture" :side="BackSide" :transparent="true" :color="item.color" />
		</TresMesh>
	</TresGroup>
</template>

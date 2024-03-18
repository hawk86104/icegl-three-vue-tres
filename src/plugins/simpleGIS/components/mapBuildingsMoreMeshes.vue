<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-18 10:12:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 20:47:48
-->
<template>
	<radraA color="#00c0ff" :radius="300" :size="300" :position="[cPosition[0], 8, -cPosition[1]]" />
	<Suspense>
		<markA :position="[cPosition[0], 8, -cPosition[1]]" :scale="0.13" img="./plugins/digitalCity/image/znsba.png"
			:foremost="false" />
	</Suspense>

	<radraB :position="[cPosition[0] + 700, 10, -cPosition[1] + 300]" color="#ffff00" :height="180" :maxRadius="400" />
	<Suspense>
		<markA :position="[cPosition[0] + 700, 10, -cPosition[1] + 300]" :scale="200"
			img="./plugins/digitalCity/image/znsb-err.png" :sizeAttenuation="true" :foremost="true" />
	</Suspense>

	<Suspense>
		<fireA :fireScale="80" :magnitude="1.3" :lacunarity="2.0" :gain="1.0"
			:position="[cPosition[0] + 280, 1, -cPosition[1] + 120]" />
	</Suspense>

	<Suspense>
		<fireB :position="[cPosition[0] + 388, 6, -cPosition[1] + 330]" />
	</Suspense>
	<Suspense>
		<smokeA :position="[cPosition[0] + 388, 6, -cPosition[1] + 330]" />
	</Suspense>

	<Suspense>
		<precipitation :speed="12" :size="20" :count="20000" color="#fff" type="snow"
			:position="[cPosition[0], 300, -cPosition[1]]" :areaX="5000" :areaY="600" :areaZ="5000" />
	</Suspense>

	<Suspense>
		<cloudMesh :cPosition="[cPosition[0], 600, -cPosition[1]]" />
	</Suspense>

	<rippleMesh :position-y="6"
		:positionSrc="[{ x: p1[0], y: -p1[1] }, { x: p1[0], y: -p2[1] }, { x: p2[0], y: -p2[1] }, { x: p2[0], y: -p1[1] }, { x: p1[0], y: -p1[1] }]"
		:height="220" color='#00ffdd' />

	<Suspense>
		<roadLightByLonLat :position="[500, 0, 340]" :radius="5.0"
			geoJson="plugins/digitalCity/geojson/shenzhen2.geojson" />
	</Suspense>
</template>

<script setup lang="ts">
import { lonLatToUtm } from '../lib/threeSatelliteMap/index'
import { radraA, radraB, precipitation, cloudMesh, markA, fireA, fireB, smokeA, rippleMesh, roadLightByLonLat } from 'PLS/digitalCity'

const props = withDefaults(defineProps<{
	cPosition: Array<number>
}>(), {
})

const p1 = lonLatToUtm(113.9456, 22.5385, 50)
const p2 = lonLatToUtm(113.9498, 22.5364, 50)

</script>
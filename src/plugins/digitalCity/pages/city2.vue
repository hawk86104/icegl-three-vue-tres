<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 09:49:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-14 20:55:00
-->
<template>
	<TresCanvas shadows window-size clearColor="#333">
		<TresPerspectiveCamera :position="[0.5, 2, 1.5]" :fov="45" :near="0.1" :far="100000" />
		<OrbitControls />
		<TresAmbientLight color="#ffffff" />
		<TresDirectionalLight :position="[0, 3, 3]" :intensity="2" color="#ffffff" cast-shadow :shadow-mapSize-width="1024"
			:shadow-mapSize-height="1024"
/>

		<Suspense>
			<buildingsMode />
		</Suspense>

		<Suspense>
			<roadLight color="#ffffff" :radius="1.0" :speed="1.0" geoJson="plugins/digitalCity/geojson/secondarySmall.geojson"
				:rotation-y="1.3826597599330712" :scale="0.001025905404044292"
				:position="[-1.877460474821603, 0.01, -1.5464791950519081]"
/>
		</Suspense>
		<TresGridHelper :args="[6, 10]" :position="[0, 0, 0]" />
	</TresCanvas>
</template>

<script setup lang="ts">


import { OrbitControls } from '@tresjs/cientos'
import buildingsMode from '../components/newBuildingsModel/buildingsMode.vue'
import roadLight from '../components/roads/roadLight.vue'

</script>
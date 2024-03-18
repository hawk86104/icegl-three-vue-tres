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
		<precipitation :speed="12" :size="20" :count="26000" color="#fff" type="snow"
			:position="[cPosition[0], 0, -cPosition[1]]" :areaX="6000" :areaY="3000" :areaZ="6000" />
	</Suspense>

	<Suspense>
		<cloudMesh :cPosition="[cPosition[0], 600, -cPosition[1]]" />
	</Suspense>
</template>

<script setup lang="ts">
import { radraA, radraB, precipitation, cloudMesh, markA, fireA, fireB, smokeA } from 'PLS/digitalCity'

const props = withDefaults(defineProps<{
	cPosition: Array<number>
}>(), {
})

</script>
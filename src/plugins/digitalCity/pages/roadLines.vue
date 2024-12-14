<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-14 20:48:36
-->
<template>
	<pagesShow :showAxesHelper="false" :showBuildings="true" :autoRotate="false" :showGridHelper="false">
		<template v-slot:ability>
			<Suspense>
				<roadLight :radius="3.0" :scale="1.5083171193254858" geoJson="plugins/digitalCity/geojson/primary.geojson" :rotation-y="-0.3866683251512052" :position="[1837.0641427711184, 30, -457.0929823910632]" />
			</Suspense>
			<Suspense>
				<roadLight v-bind="roadsState" geoJson="plugins/digitalCity/geojson/secondary.geojson"
					:rotation-y="-0.40417060831376245" :scale="1.5083171193254858"
					:position="[1835.1352780974694, 30, -358.6036261374844]"
/>
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { Pane } from 'tweakpane'
import { reactive } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import roadLight from '../components/roads/roadLight.vue'

const roadsState = reactive({
	color: '#ffffff',
	radius: 2,
	speed: 2.0
})
const paneControl = new Pane({
	title: '道路效果',
	expanded: true,
})
paneControl.addBinding(roadsState, 'color', { label: '颜色' })
paneControl.addBinding(roadsState, 'speed', {
	label: '速度',
	min: 0.1,
	max: 5,
	step: 0.1,
})
paneControl.addBinding(roadsState, 'radius', {
	label: '粗细',
	min: 1,
	max: 8,
	step: 0.1,
})

</script>

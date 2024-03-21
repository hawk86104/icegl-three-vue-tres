<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:00:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-21 08:45:09
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<regionGlow :position-y="26"
				:positionSrc="[[-7.3 * 40, 4.27 * 40], [-7.4 * 40, 10.05 * 40], [-4.9 * 40, 10.03 * 40], [-4.9 * 40, 4.46 * 40], [-7.3 * 40, 4.27 * 40]]" />

			<regionGlow :position-y="regionGlowState.height" :color="regionGlowState.color" :positionSrc="[[0.27 * 40, -1.19 * 40], [0.32 * 40, -5.5 * 40], [-7.59 * 40, -5.9 * 40], [-7.6 * 40, -1.3 * 40],
			[0.27 * 40, -1.19 * 40]]" />
			<regionGlow :position="[500, 86, 300]" color="#0054ff" :positionSrc="[[0.27 * 40, -1.19 * 40], [0.32 * 40, -5.5 * 40], [-7.59 * 40, -5.9 * 40], [-8.59 * 40, -3.9 * 40],
			[-7.6 * 40, -1.3 * 40], [-2.6 * 40, 1.3 * 40], [2.6 * 40, -1.3 * 40],
			[0.27 * 40, -1.19 * 40]]" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import pagesShow from '../components/pagesShow.vue'
import regionGlow from '../components/fence/regionGlow.vue'

const regionGlowState = reactive({
	color: '#00ffdd',
	height: 26,
})

const paneControl = new Pane({
	title: '区域边界发光',
	expanded: true,
})

paneControl.addBinding(regionGlowState, 'color', { label: '颜色' })

paneControl.addBinding(regionGlowState, 'height', { label: '高度', min: 0, max: 80, step: 1 })
</script>

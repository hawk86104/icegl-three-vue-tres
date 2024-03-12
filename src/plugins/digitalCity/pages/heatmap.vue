<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-29 16:29:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 19:03:12
-->
<template>
	<loading></loading>
	<pagesShow>
		<template v-slot:ability>
			<heatmapJS ref="heatmapJSRef" v-bind="typeState" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Pane } from 'tweakpane';
import heatmapJS from 'PLS/heatMap/components/heatmapJS.vue'
import loading from 'PLS/UIdemo/components/loading/default.vue'
import pagesShow from '../components/pagesShow.vue'

const typeState = reactive({
	show2dCanvas: true,
	heightRatio: 20,
	position: [0, 20, 0],
	Plane: [1000, 1000, 1000, 1000]
})
const paneControl = new Pane({
	title: '参数',
	expanded: true
});
paneControl.addBinding(typeState, 'show2dCanvas', {
	label: '显示二维图'
})
paneControl.addBinding(typeState, 'heightRatio', {
	label: '高度', min: 10,
	max: 100,
	step: 10,
})
</script>

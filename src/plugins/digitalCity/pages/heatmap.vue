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
import loading from '../components/loading.vue'
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

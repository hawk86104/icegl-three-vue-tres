<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:29:48
-->
<template>
	<loading></loading>
	<pagesShow ref="pagesShowRef" :autoRotate="false">
		<template v-slot:ability>
			<Suspense>
				<precipitation v-bind="toRefsState" />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive, toRefs } from 'vue'
import { Pane } from 'tweakpane'
import loading from 'PLS/UIdemo/components/loading/default.vue'
import pagesShow from '../components/pagesShow.vue'
import precipitation from '../components/weather/precipitation.vue'
// import smokes from '../components/weather/smokes.vue';

const pagesShowRef = ref()
onMounted(() => {
    nextTick(() => {
        if (pagesShowRef.value) {
            pagesShowRef.value.$refs.perspectiveCameraRef.position.set(750, 500, 800)
        }
    })
})
const precipitationState = reactive({
	speed: 12,
	size: 10,
	count: 6000,
	color: '#fff',
	type: 'snow',	// snow rain point
})
const areaXYZ = reactive({
	areaX: 1500,
	areaY: 1000,
	areaZ: 1500,
})
const toRefsState = reactive({
	...toRefs(precipitationState),
	...toRefs(areaXYZ),
})
const paneControl = new Pane({
	title: '天气',
	expanded: true,
})
const f1 = paneControl.addFolder({
	title: '下落物',
})
f1.addBinding(precipitationState, 'speed', {
	label: '速度',
	min: 0,
	max: 30,
	step: 1,
})
f1.addBinding(precipitationState, 'color', {
	label: '颜色',
})
f1.addBinding(precipitationState, 'size', {
	label: '大小',
	min: 0,
	max: 26,
	step: 1,
})
f1.addBinding(precipitationState, 'count', {
	label: '数量',
	min: 1000,
	max: 10000,
	step: 100,
})
f1.addBinding(precipitationState, 'type', {
	view: 'list',
	label: '类型',
	options: [
		{ text: '雪', value: 'snow' },
		{ text: '雨', value: 'rain' },
		{ text: '点', value: 'point' },
	]
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-13 11:20:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 20:43:08
-->

<script setup lang="ts">
import loading from 'PLS/UIdemo/components/loading/huruji.vue'
import { Pane } from 'tweakpane'
import { reactive } from 'vue'

const paneControl = new Pane({
	title: '样式',
	expanded: true
})
const paneState = reactive({
	styleNum: 0,
})
paneControl.addBinding(paneState, 'styleNum', {
	label: '样式选择',
	options: {
		样式一: 0,
		样式二: 1,
		样式三: 2,
		样式四: 3,
		样式五: 4,
		样式六: 5,
		样式七: 6,
		样式八: 7,
	},
});
</script>

<template>
	<loading :styleNum="paneState.styleNum" />
</template>

<style>
.tp-dfwv {
	z-index: 999;
}
</style>

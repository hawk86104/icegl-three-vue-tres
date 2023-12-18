<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-15 10:58:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-18 11:05:32
-->

<template>
	<pagesShow :disableRender="true" :showAxesHelper="false">
		<template v-slot:ability>
			<buildingsPassA v-bind="passState" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import buildingsPassA from '../components/buildings/buildingsPassA.vue'

import { reactive } from 'vue'
import { Pane } from 'tweakpane'

const passState = reactive({
	color: '#00b4fb',
	uScalenum: 250,
	uScaleone: 82,
	uWidth: 0.2,
	speed: 10.0,
	uPosition: { x: 0, y: 0 },
})

const paneControl = new Pane({
	title: '后期效果',
	expanded: true,
});
paneControl.addBinding(passState, 'color', { label: '圈颜色' })
paneControl.addBinding(passState, 'uScalenum', {
	label: '最大范围',
	min: 1,
	max: 500,
	step: 10,
})
paneControl.addBinding(passState, 'uScaleone', {
	label: '单条圈间距',
	min: 1,
	max: 100,
	step: 1,
})
paneControl.addBinding(passState, 'uWidth', {
	label: '单条圈宽度',
	min: 0,
	max: 1,
	step: 0.01,
})
paneControl.addBinding(passState, 'speed', {
	label: '速度',
	min: 1,
	max: 20,
	step: 1,
})
paneControl.addBinding(passState, 'uPosition', {
	picker: 'inline',
	label: '位置',
	expanded: true,
	x: { min: -1000, max: 1000, step: 10 },
	y: { min: -1000, max: 1000, step: 10 },
});
</script>

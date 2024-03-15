<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-15 12:12:46
-->
<template>
	<loading></loading>
	<pagesShow>
		<template v-slot:ability>
			<radraA v-if="typeAradarState.show" ref="radraARef" :color="typeAradarState.color"
				:radius="typeAradarState.radius" :size="300" :position="[10, 60, 0]" />
			<radraB v-if="typeBradarState.show" :position="[600, 30, 0]" :color="typeBradarState.color" :height="80"
				:maxRadius="typeBradarState.maxRadius" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Pane } from 'tweakpane';
import { defaultLoading as loading } from 'PLS/UIdemo'
import { radraA, radraB } from 'PLS/digitalCity'
import pagesShow from '../components/pagesShow.vue'

const radraARef = ref()

const typeAradarState = reactive({
	show: true,
	color: '#00c0ff',
	radius: 300,
})
const paneControl = new Pane({
	title: '雷达效果',
	expanded: true,
});
const f1 = paneControl.addFolder({
	title: 'A型',
});
f1.addBinding(typeAradarState, 'show', { label: '显示' })
f1.addBinding(typeAradarState, 'color', { label: '颜色' })
f1.addBinding(typeAradarState, 'radius', {
	label: '大小', min: 1,
	max: 400,
	step: 10,
})

const typeBradarState = reactive({
	show: true,
	color: '#ffff00',
	maxRadius: 300,
})
const f2 = paneControl.addFolder({
	title: 'B型',
});
f2.addBinding(typeBradarState, 'show', { label: '显示' })
f2.addBinding(typeBradarState, 'color', { label: '颜色' })
f2.addBinding(typeBradarState, 'maxRadius', {
	label: '大小', min: 10,
	max: 400,
	step: 10,
})
</script>

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-25 14:54:00
-->
<template>
	<pagesShow>
		<template v-slot:ability>
			<radraA v-if="typeAradarState.show" ref="radraARef" :color="typeAradarState.color" :radius="typeAradarState.radius"
				:size="300" :position="[10, 60, 0]" />
			<radraB v-if="typeBradarState.show" :position="[600, 30, 0]" :color="typeBradarState.color" :height="100"
				:maxRadius="typeBradarState.maxRadius" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Pane } from 'tweakpane';
import pagesShow from '../components/pagesShow.vue'
import radraA from '../components/radras/radraA.vue';
import radraB from '../components/radras/radraB.vue';

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
	maxRadius: 100,
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

<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-25 12:44:28
-->
<template>
	<pagesShow>
		<template v-slot:ability>
			<radraA ref="radraARef" v-if="typeAradarState.show" :color="typeAradarState.color" :radius="typeAradarState.radius"
				:position="[10, 60, 0]" @click="changeObject(radraARef)" />
			<radraB :position="[600, 30, 0]" color="#00ff00" />
			<!-- <TransformControls v-if="transformRef" :object="transformRef" v-bind="controlsState" /> -->
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Pane } from 'tweakpane';
// import { TransformControls } from '@tresjs/cientos'
import pagesShow from '../components/pagesShow.vue'
import radraA from '../components/radras/radraA.vue';
import radraB from '../components/radras/radraB.vue';

// const controlsState = reactive({
// 	mode: 'translate',
// 	enabled: true,
// 	space: 'world',
// 	axis: 'XYZ',
// 	size: 2,
// 	showX: true,
// 	showY: true,
// 	showZ: true,
// })

// const transformRef = ref()
const radraARef = ref()
function changeObject(object: any) {
	// transformRef.value = object.MeshRef
}


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
</script>

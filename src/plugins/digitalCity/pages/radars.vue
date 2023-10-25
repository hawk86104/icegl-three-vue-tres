<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-25 10:16:50
-->
<template>
	<pagesShow>
		<template v-slot:ability>
			<radraA ref="radraARef" :position="[10, 60, 0]" @click="changeObject(radraARef)" />
			<radraB :position="[600, 30, 0]" color="#00ff00" />
			<!-- <TransformControls v-if="transformRef" :object="transformRef" v-bind="controlsState" /> -->
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const transformRef = ref()
const radraARef = ref()
function changeObject(object: any) {
	transformRef.value = object.MeshRef
}
</script>

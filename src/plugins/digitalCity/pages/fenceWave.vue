<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-17 15:04:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:28:58
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<wave :position-y="20"
				:positionSrc="[{ x: -7.3 * 40, y: 4.27 * 40 }, { x: -7.4 * 40, y: 10.05 * 40 }, { x: -4.9 * 40, y: 10.03 * 40 }, { x: -4.9 * 40, y: 4.46 * 40 }, { x: -7.3 * 40, y: 4.27 * 40 }]"
				:height="180"
/>

			<wave :position-y="20"
				:positionSrc="[{ x: 0.27 * 40, y: -1.19 * 40 }, { x: 0.32 * 40, y: -5.5 * 40 }, { x: -7.59 * 40, y: -5.9 * 40 }, { x: -7.6 * 40, y: -1.3 * 40 }, { x: 0.27 * 40, y: -1.19 * 40 }]"
				v-bind="typeState"
/>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from 'vue'
import { Pane } from 'tweakpane'
import {wave} from 'PLS/digitalCity'
import pagesShow from '../components/pagesShow.vue'

const pagesShowRef = ref()
onMounted(() => {
    nextTick(() => {
        if (pagesShowRef.value) {
            pagesShowRef.value.$refs.perspectiveCameraRef.position.set(580, 360, 500)
        }
    })
})

const typeState = reactive({
	color: '#00ffdd',
	opacity: 0.8,
	frequencyNum: 6,
	speed: 1,
	height:100
})
const paneControl = new Pane({
	title: '围墙效果',
	expanded: true,
})
paneControl.addBinding(typeState, 'color', { label: '颜色' })
paneControl.addBinding(typeState, 'opacity', {
	label: '透明度', min: 0,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(typeState, 'speed', {
	label: '滚动速度', min: 0.1,
	max: 5,
	step: 0.001,
})
paneControl.addBinding(typeState, 'frequencyNum', {
	label: '波浪数', min: 0,
	max: 20,
	step: 1,
})
paneControl.addBinding(typeState, 'height', {
	label: '高度', min: 10,
	max: 300,
	step: 1,
})
</script>

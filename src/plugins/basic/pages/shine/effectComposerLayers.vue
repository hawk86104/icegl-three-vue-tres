<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 15:02:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-30 16:06:47
-->

<template>
	<TresCanvas disableRender window-size ref="tcRef">
		<TresPerspectiveCamera :position="[10, 10, 10]" />
		<TresAmbientLight :intensity="1" />
		<OrbitControls />
		<TresGridHelper :args="[10, 10]" />
		<!-- 这种方式存在bug：无论相机在哪个角度，都看到正常方块绘制在发光方块之上 -->
		<ecLayers />
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'
import ecLayers from '../../components/ecLayers.vue'
import { watchEffect, ref } from 'vue'

const tcRef = ref()
watchEffect(() => {
	if (tcRef.value) {
		let renderer = tcRef.value.context.renderer.value
		renderer.autoClear = false
	}
})
</script>
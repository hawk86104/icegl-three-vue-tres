<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:03:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:39:29
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[0, 0, 166]" :fov="75" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" />
		<!-- <TresGridHelper /> -->
		<Suspense>
			<chinaMapMesh />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import chinaMapMesh from '../components/chinaMapMesh.vue'

const state = reactive({
	clearColor: '#201919',
	// alpha: false,
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
})


const { onLoop } = useRenderLoop()

onLoop(() => {

})

watchEffect(() => {

})

</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-09-22 10:56:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-03 16:35:27
-->
<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'

const { onLoop } = useRenderLoop()

const groupRef = ref()
onLoop(() => {
	if (groupRef.value) {
		groupRef.value.rotation.y += 0.01
	}
})
</script>

<template>
	<TresCanvas clearColor="#000000" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :aspect="1" :near="0.1" :far="1000" />
		<OrbitControls />
		<TresAmbientLight :color="0xffffff" :intensity="0.5" />
		<TresGroup ref="groupRef" :position="[0, -4, -5]">
			<TresMesh :scale="1" :position="[-4, 0, 0]" cast-shadow>
				<TresSphereGeometry :args="[1, 500, 500]" />
				<TresMeshToonMaterial color="#FBB03B" />
			</TresMesh>
			<TresMesh :scale="1" :position="[4, 0, 0]" cast-shadow>
				<TresSphereGeometry :args="[1, 500, 500]" />
				<TresMeshToonMaterial color="teal" />
			</TresMesh>
		</TresGroup>
		<TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
		<TresAxesHelper />
	</TresCanvas>
</template>

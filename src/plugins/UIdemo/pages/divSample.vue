<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:08:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 09:17:25
-->

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import divS1 from '../components/divS1.vue'
import divS2 from '../components/divS2.vue'
</script>

<template>
	<TresCanvas clearColor='#999' window-size>
		<TresPerspectiveCamera :position="[3, 0, 8]" />
		<OrbitControls />
		<TresMesh :position="[1, 1, 1]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
			<divS1 />
			<divS2 />
		</TresMesh>
	</TresCanvas>
</template>



<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 15:02:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 08:07:35
-->

<template>
	<TresCanvas disableRender window-size>
		<TresPerspectiveCamera :position="[10, 10, 10]" />
		<TresAmbientLight :intensity="1" />
		<!-- <TresDirectionalLight :position="[0, 10, 0]" :intensity="10" v-light-helper color="#ffffff" /> -->

		<OrbitControls />
		<TresGridHelper :args="[10, 10]" />
		<MaskPass />
	</TresCanvas>
</template>

<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'
import MaskPass from '../../components/MaskPass.vue'

</script>
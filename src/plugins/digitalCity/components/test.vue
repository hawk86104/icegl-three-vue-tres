<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 09:35:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:48:10
-->
<script setup lang="ts">
import { onMounted, onUnmounted, inject, defineExpose, ref } from 'vue'
const props = withDefaults(
	defineProps<{
		showBuildings?: boolean
		autoRotate?: boolean
	}>(),
	{
		showBuildings: true,
		autoRotate: true
	},
)
onUnmounted(() => {

})
onMounted(() => {
	// const showbuildingsLines = inject('showbuildingsLines')
})
// const count = ref(123456)
defineExpose({
	props
})
</script>

<template>
	<div style="display: none;"></div>
</template>

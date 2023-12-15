<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-21 17:24:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-15 09:02:08
-->
<template>
	<Suspense>
		<router-view />
	</Suspense>
	<showSrcBtn />
</template>
<script setup lang="ts">
import showSrcBtn from "./showSrcBtn.vue"
</script>
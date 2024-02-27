<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-21 17:24:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-29 18:57:08
-->
<template>
	<Suspense>
		<router-view />
	</Suspense>
	<showSrcBtn />
	<referenceSource />
	<FPSGraph />
</template>
<script setup lang="ts">
import showSrcBtn from "./showSrcBtn.vue"
import referenceSource from "./referenceSource.vue"
import FPSGraph from "./FPSGraph.vue"
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-12 21:53:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-13 20:39:49
-->

<script setup lang="ts">
import { loading1, loading2, bubbleLoading, vnyoonLoading, yangyangLoading, starLoading } from 'PLS/UIdemo'
import { reactive } from 'vue'

const paneState = reactive({
	styleNum: 0,
	showProgress: true
})
paneState.styleNum = Math.floor(Math.random() * 24)
paneState.showProgress = Math.random() < 0.5
console.log(paneState.styleNum, paneState.showProgress)
</script>

<template>
	<loading1 v-if="paneState.styleNum < 10" :styleNum="paneState.styleNum" :showProgress="paneState.showProgress" />
	<loading2 v-else-if="paneState.styleNum < 20" :styleNum="paneState.styleNum - 10"
		:showProgress="paneState.showProgress" />
	<bubbleLoading v-else-if="paneState.styleNum === 20" :showProgress="paneState.showProgress" />
	<vnyoonLoading v-else-if="paneState.styleNum === 21" :showProgress="paneState.showProgress" />
	<yangyangLoading v-else-if="paneState.styleNum === 22" :showProgress="paneState.showProgress" />
	<starLoading v-else-if="paneState.styleNum === 23" :showProgress="paneState.showProgress" />
</template>

<style></style>

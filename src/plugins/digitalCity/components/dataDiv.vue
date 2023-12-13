<template>
	<div class="title" v-show="showDiv">dsadsadas</div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const showDiv = ref(false)

watchEffect(() => {
	// if (showDiv) {
	// 	console.log("showDiv:", showDiv)
	// }
})
</script>

<style lang="less" scoped>
.title {
	color: white;
	font-size: 20px;
	font-weight: bolder;
	position: absolute;
	z-index: 99999;
}
</style>
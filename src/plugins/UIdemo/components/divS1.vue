<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 09:06:30
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 10:10:43
-->
<script setup lang="ts">
import { reactive } from 'vue'
// import { Color, MeshPhongMaterial, BoxGeometry } from 'three'
import { Html } from '@tresjs/cientos'

const state = reactive({
	wrapperClass: 'divS1',
	as: 'div',
	// center: true,	//居中
	// transform: true,//根据模型同步变换矩阵
	// material: new MeshPhongMaterial({ color: 'red' }),
	// geometry: new BoxGeometry()
})
</script>
<template>
	<Html v-bind="state">
	<div class="boxStyle1 pos-relative left-20 top--30 text-white">
		这是正方形 📦
	</div>

	</Html>
</template>

<!-- scoped bg-#00336660 -->
<style lang="less">
.divS1 {
	user-select: none;
	pointer-events: none !important;

	div:first-of-type {
		position: relative !important;
	}

	.boxStyle1 {
		padding: 10px;
		border-left: 10px solid #336699;
		background-image: linear-gradient(132deg, #00336680, #00336610);
	}
}
</style>
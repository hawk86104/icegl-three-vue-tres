<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 10:30:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-11 10:37:43
-->

<script setup lang="ts">
import { reactive } from 'vue'
// import { Color, MeshPhongMaterial, BoxGeometry } from 'three'
import { Html } from '@tresjs/cientos'

const state = reactive({
	wrapperClass: 'divS2',
	as: 'div',
	sprite: true,
	center: true,	//居中
	transform: true,//根据模型同步变换矩阵
	distanceFactor: 1,
	// material: new MeshPhongMaterial({ color: 'red' }),
	// geometry: new BoxGeometry()
})
let publicPath = process.env.BASE_URL
</script>
<template>
	<Html v-bind="state">
	<div class="poputs_show_cl">
		<div class="oneline">
			<div class="name">最远距离(km)</div>
			<div class="num_s">120</div>
			<img :src="publicPath + '/plugins/UIdemo/image/jiantou1.png'">
			<div class="num_end">30</div>
		</div>
		<div class="oneline">
			<div class="name">切片(层)</div>
			<div class="num_s">10</div>
			<img :src="publicPath + '/plugins/UIdemo/image/jiantou2.png'">
			<div class="num_end">50</div>
		</div>
		<div class="oneline">
			<div class="name">最大速度(m/s)</div>
			<div class="num_s">12</div>
			<img :src="publicPath + '/plugins/UIdemo/image/jiantou2.png'">
			<div class="num_end">46</div>
		</div>
	</div>

	</Html>
</template>

<!-- scoped -->
<style lang="less">
.divS2>div:first-of-type {
	position: relative !important;
}

.divS2 {
	user-select: none;
	pointer-events: none !important;

	#inner {
		user-select: none;
		pointer-events: none !important;
	}

	.poputs_show_cl {
		opacity: 1.0;
		position: relative;
		top: 100px;
		left: 60px;
		padding: 8px;
		background-color: rgba(0, 0, 0, 0.58);
		border-radius: 12px;
		border: 1px solid #7af5e06b;
	}

	.oneline {
		margin: 6px 10px;
		font-size: 13px;
		display: flex;

		.name {
			color: #4bd7e6;
			width: 7em;
			text-align: right;
		}

		.num_s {
			width: 2em;
			text-align: center;
			color: #f7a61f;
		}

		.num_end {
			width: 2em;
			text-align: center;
			color: #08b0dd;
		}
	}

}
</style>
<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-16 09:37:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-16 12:09:10
-->
<template>
	<div v-show="su7Store.showColorList" class="colorList">
		<div v-for="(item, index) in resImg" :key="index" :class="{ 'color-item': su7Store.selColorIndex === index }"
    	:style="{ backgroundImage: `url(@/../plugins/industry4/icon/${item.src})`, width: '32px', height: '32px', borderRadius: '50%', margin: '8px', backgroundSize: '100% 100%', cursor: 'pointer' }"
			@click="clickColor(index)"
>
  	</div>
	</div>
</template>
<script lang="ts" setup>
import { useSu7Store } from 'PLS/industry4/stores/su7'

const su7Store = useSu7Store()

const resImg = [
	{
		src: 'c1.webp',
		color: '#26d6e9'
	},
	{
		src: 'c2.webp',
		color: "#444c3c"
	},
	{
		src: 'c3.webp',
		color: "#5d5d5d"
	},
	{
		src: 'c4.webp',
		color: "#8a8a8a"
	},
	{
		src: 'c5.webp',
		color: "#3e3543"
	},
	{
		src: 'c6.webp',
		color: "#822817"
	},
	{
		src: 'c7.webp',
		color: "#e0b023"
	},
	{
		src: 'c8.webp',
		color: "c8.webp"
	},
	{
		src: 'c9.webp',
		color: "c9.webp"
	}
]
const clickColor = (index: number) => {
	su7Store.selColorIndex = index
	su7Store.selColorData = resImg[index].color
}
</script>

<style scoped lang="less">
.colorList {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	bottom: 100px;
	background-color: #ccc3;
	border-radius: 30px;
	display: flex;
	align-items: center;
	z-index: 9999;
}

.color-item::after {
	content: "";
	display: block;
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 38px;
	height: 38px;
	border-radius: 50%;
	border: 2px solid #fff;
}
</style>
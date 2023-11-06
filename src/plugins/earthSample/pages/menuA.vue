<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 09:30:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 11:59:07
-->
<template>
	<div class="bg-img flex justify-center flex-items-center">
		<starts></starts>
		<div class="w-120 h-120 pos-relative">
			<Suspense>
				<circleo />
			</Suspense>
			<div class="css_globe_halo1"></div>
			<Suspense>
				<earth />
			</Suspense>
		</div>
	</div>
</template>

<script setup lang="ts">
import starts from '../components/menuA/starts.vue'
import circleo from '../components/menuA/circle.vue'
import earth from '../components/menuA/earth.vue'
</script>

<style lang="less" scoped>
.bg-img {
	height: 100%;
	position: absolute;
	background: url("@/../../plugins/earthSample/image/menuA/bg-img.png");
	background-size: cover;
	top: 0;
	width: 100%;
}

.css_globe_halo1 {
	position: absolute;
	background: url("@/../../plugins/earthSample/image/menuA/css_globe_halo1.png");
	background-size: cover;
	filter: hue-rotate(1deg);
	width: 100%;
	height: 100%;
	// margin-left: -10px;
	// margin-top: 3px;
}
</style>
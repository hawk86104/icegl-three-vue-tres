<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-15 09:11:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-15 09:27:24
-->
<template>
	<FButton type="info" class="absolute" size="small" style="right: 10px; bottom: 10px;" @click="jump()">
		<template #icon>
			<ProductOutlined />
		</template>源码地址
	</FButton>
</template>
<script setup lang="ts">
import { ProductOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'

let originalUrl = window.location.href
let hashPart = originalUrl.split('#')[1] || ''
let parts = hashPart.split('/')

let baseUrl = 'https://gitee.com/ice-gl/icegl-three-vue-tres/blob/master/src'
let newUrl = `${baseUrl}/${parts[1]}/${parts[2]}/pages/${parts.slice(3).join('/')}.vue`
console.log('源码地址', newUrl)

const jump = () => {
	window.open(newUrl)
}
</script>
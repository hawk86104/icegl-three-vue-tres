<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 18:57:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-29 19:26:17
-->

<template>
	<FButton type="info" class="absolute" size="small" style="left: 10px; bottom: 10px;" @click="jump()"
		v-if="referenceSource">
		<template #icon>
			<StarOutlined />
		</template>参考出处 ：{{ referenceSource.title }}
	</FButton>
</template>
<script setup lang="ts">
import { StarOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'
import { getOnePluginConfig } from '../../common/utils'

let originalUrl = window.location.href
let hashPart = originalUrl.split('#')[1] || ''
let parts = hashPart.split('/')

let config = getOnePluginConfig(parts[2], parts[3])

console.log(config)
const referenceSource = config?.referenceSource

const jump = () => {
	window.open(referenceSource.url)
}
</script>
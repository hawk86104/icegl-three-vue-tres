<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 19:30:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-02 16:14:46
-->
<template>
	<FButton v-if="referenceSource" type="info" class="absolute" size="small" style="left: 10px; bottom: 10px;"
		@click="jump">
		<template #icon>
			<StarOutlined />
		</template>参考出处 ：{{ referenceSource.title }}
	</FButton>
</template>
<script setup lang="ts">
import { StarOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'
import { getOnePluginConfig } from '../../common/utils'

const originalUrl = window.location.href
const hashPart = originalUrl.split('#')[1] || ''
const parts = hashPart.split('/')

let config = null

if (parts[2] === "basic") {
	config = getOnePluginConfig(parts[2], parts[3], parts[4])
} else {
	config = getOnePluginConfig(parts[2], parts[3])
}
console.log(config)
const referenceSource = config?.referenceSource

const jump = () => {
	window.open(referenceSource.url)
}
</script>
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 16:02:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-26 16:15:49
-->
<template>
	<FDivider titlePlacement="left">{{ props.onePlugin.title + ' - ' + props.onePlugin.name }}</FDivider>
	<FSpace vertical>
		<a target="_blank" :href="props.onePlugin.website" style="text-decoration: none;color: black;">
			<FText v-if="props.onePlugin.author" class="text-right ml-[10px] w-95/100 mt-[-24px] block position-relative"
				style="color:#0f1222" size="small">
				<UserOutlined class="position-relative top-[2px]" /> 作者：
				{{
					props.onePlugin.author }}
			</FText>
		</a>
		<FText class="ml-13" tag="i" size="small">{{ props.onePlugin.intro }}</FText>
	</FSpace>
	<div class="flex flex-wrap flex-justify-start content-start mt-6 pl-6">
		<div class="w-80 mr-10 mb-10 overflow-hidden" v-for="(onePreview, okey) in onePlugin.preview" :key="okey">
			<FCard :header="onePreview.title" shadow="hover">
				<video controls class="w-full max-h-70" v-if="onePreview.type === 'video'">
					<source :src="publicPath + onePreview.src" type="video/mp4" autoplay="true" loop="true" />
				</video>
				<img class="w-full max-h-70" v-else-if="onePreview.type === 'img'" :src="publicPath + onePreview.src" />
				<div class="w-full h-48 text-3 text-left mb-2"
					style="background-color: rgb(55 56 61);overflow: hidden;border-radius: 10px;"
					v-else-if="onePreview.type === 'text'">
					<div class="p-2" style="color: white;">{{ onePreview.src }}</div>
				</div>
				<div class="cursor-pointer" @click="toPage(props.onePlugin, onePreview.name)">点击查看详情</div>
			</FCard>
		</div>
	</div>
</template>
<script setup lang="ts">
import { FCard, FDivider, FSpace, FText } from '@fesjs/fes-design'
import { useRouter } from '@fesjs/fes' //fesJS的路由被他自己封装了
import { UserOutlined } from '@fesjs/fes-design/icon'
const props = withDefaults(
	defineProps<{
		onePlugin: Object
	}>(),
	{},
)

let publicPath = process.env.BASE_URL

const router = useRouter()
const toPage = (plugin: any, value: any) => {
	let path = `/plugins/${plugin.name}/${value}`
	if (plugin.pNode) {
		path = `/plugins/${plugin.pNode}/${plugin.name}/${value}`
	}
	let routeUrl = router.resolve({
		path: path
	});
	window.open(routeUrl.href, '_blank');
}
</script>

<style>
.fes-divider:not(.is-vertical) .fes-divider-text {
	font-size: 1.2em;
	background-color: #0f1222;
	font-weight: bolder;
	color: white;
}

.fes-divider {
	background-color: #0f1222;
	margin: 0px 10px 0px;
	width: 95%;
}
</style>
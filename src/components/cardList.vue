<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 16:02:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-04 19:01:01
-->
<template>
	<FDivider titlePlacement="left">{{ props.onePlugin.title + ' - ' + props.onePlugin.name }}</FDivider>
	<FText class="ml-13" tag="i" size="small">{{ props.onePlugin.intro }}</FText>
	<div class="flex flex-wrap flex-justify-start content-start mt-6 pl-6">
		<div class="w-80 mr-10 mb-10 overflow-hidden" v-for="(onePreview, okey) in onePlugin.preview" :key="okey">
			<FCard :header="onePreview.title" shadow="hover">
				<video controls class="w-full max-h-70" v-if="onePreview.type === 'video'">
					<source :src="publicPath + onePreview.src" type="video/mp4" autoplay="true" loop="true" />
				</video>
				<img class="w-full max-h-70" v-else :src="publicPath + onePreview.src" />
				<div class="cursor-pointer" @click="toPage(props.onePlugin, onePreview.name)">点击查看详情</div>
			</FCard>
		</div>
	</div>
</template>
<script setup lang="ts">
import { FCard, FDivider, FText } from '@fesjs/fes-design';
import { useRouter } from '@fesjs/fes'; //fesJS的路由被他自己封装了
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
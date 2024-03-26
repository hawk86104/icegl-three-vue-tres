<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 16:02:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-26 17:05:19
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
		<div class="w-80 mr-10 mb-10 overflow-hidden relative" v-for="(onePreview, okey) in  onePlugin.preview "
			:key="okey">
			<template v-if="onePlugin.waitForGit || onePreview.waitForGit">
				<div v-if="hasStyle(props.onePlugin, onePreview.name)" class="tag-sheared" :class="classText(props.onePlugin,
		onePreview.name)
		">{{ hasStyle(props.onePlugin,
		onePreview.name) }}</div>
				<FCard :header="onePreview.title" shadow="hover">
					<div class="w-full h-48 text-5 line-height-1.5em text-left mb-2 text-#5384ff"
						style="background-color: rgb(55 56 61);overflow: hidden;border-radius: 10px;">
						<div class="p-2">官网已经更新的插件功能，请git 更新代码!</div>
					</div>
					<div class=" cursor-pointer text-right" style="margin-top: 6px;margin-bottom: -8px;"
						@click="toPage(props.onePlugin, onePreview.name, true)">点击查看演示</div>
				</FCard>
			</template>
			<template v-else>
				<div v-if="hasStyle(props.onePlugin, onePreview.name)" class="tag-sheared" :class="classText(props.onePlugin,
		onePreview.name)
		">{{ hasStyle(props.onePlugin,
		onePreview.name) }}</div>
				<FCard :header="onePreview.title" shadow="hover">
					<video controls class="w-full max-h-70 h-14em" v-if="onePreview.type === 'video'">
						<source :src="publicPath + onePreview.src" type="video/mp4" autoplay="true" loop="true" />
					</video>
					<FImage class="w-full max-h-70 h-14em" v-else-if="onePreview.type === 'img'"
						:src="publicPath + onePreview.src" lazy />
					<div class="w-full h-48 text-3 text-left mb-2"
						style="background-color: rgb(55 56 61);overflow: hidden;border-radius: 10px;"
						v-else-if="onePreview.type === 'text'">
						<div class="p-2" style="color: white;">{{ onePreview.src }}</div>
					</div>
					<div class="cursor-pointer text-right" style="margin-top: 6px;margin-bottom: -8px;"
						@click="toPage(props.onePlugin, onePreview.name)">点击查看演示</div>
				</FCard>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
import { FCard, FDivider, FSpace, FText, FImage } from '@fesjs/fes-design'
import { useRouter, useModel } from '@fesjs/fes' //fesJS的路由被他自己封装了
import { UserOutlined } from '@fesjs/fes-design/icon'
const props = withDefaults(
	defineProps<{
		onePlugin: any
	}>(),
	{},
)
const { menuSetup } = useModel('forPreview')
let publicPath = process.env.BASE_URL

const router = useRouter()
const toPage = (plugin: any, value: any, isOnline: boolean) => {
	let path = `/plugins/${plugin.name}/${value}`
	if (plugin.pNode) {
		path = `/plugins/${plugin.pNode}/${plugin.name}/${value}`
	}
	if (isOnline) {
		path = 'https://opensource.icegl.cn/#' + path
		window.open(path, '_blank')
	} else {
		let routeUrl = router.resolve({
			path: path
		})
		window.open(routeUrl.href, '_blank')
	}
}

const hasStyle = (plugin: any, value: any) => {
	if (menuSetup.value) {
		if (menuSetup.value[plugin.name] && menuSetup.value[plugin.name][value]) {
			return menuSetup.value[plugin.name][value].taglist_text
		}
	}
	return ''
}
const classText = (plugin: any, value: any) => {
	if (menuSetup.value) {
		if (menuSetup.value[plugin.name] && menuSetup.value[plugin.name][value]) {
			return menuSetup.value[plugin.name][value].taglist
		}
	}
	return ''
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

.fes-card__header {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
<style lang="less" scoped>
.tag-sheared {
	background-color: #063667;
	color: white;
	width: 100%;
	height: 12%;
	line-height: 246%;
	text-align: center;
	margin-left: 41%;
	margin-top: 4%;
	position: absolute;
	font-size: 1.1em;
	transform: rotate(45deg);

	&.recommend {
		background-color: #e6698b;
	}

	&.hot {
		background-color: #b51c22;
	}
}
</style>
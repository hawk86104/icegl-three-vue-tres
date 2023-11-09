<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:05:30
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-09 09:30:36
-->
<template>
	<FDivider titlePlacement="left">关于我们 - ICEGL</FDivider>
	<div class="article-text">
		<p>
			<img style="width:200px;"
				src="https://icegl-1314935952.cos.ap-beijing.myqcloud.com/uploads/20221122/9ed6756107c4e0c031ae26d54cb46c0d.png">
		</p>
		<p>
			欢迎来到 <strong><span style="color:#337FE5;">ICE</span></strong> 「<em>Image、Community、Education</em>」图形学社区，围绕 webgl
			的交流学习社区，这里是国内最全的 Web 图形学知识库，同时也是一个致力于打造全新图形学生态体系的社区。
		</p>
		<p>
			我们的使命是通过开源协作和知识分享，促进图形学技术的不断进步。我们相信图形学是一个无限创新的领域，可以应用于游戏开发、虚拟现实、增强现实、计算机辅助设计等多个领域。
		</p>
		<h3 class="text-center" style="color:#337FE5;"><strong>🤔 问题反馈</strong></h3>
		<p>
			在使用中有任何问题，请使用以下联系方式联系我们
			<a href="https://www.icegl.cn/ask">图形学社区icegl.cn</a>
		</p>
		<p>
			<img src="https://icegl-1314935952.cos.ap-beijing.myqcloud.com/uploads/20230421/QQ20230421-121209.png" width="680">
		</p>
		<h3 class="text-center" style="color:#337FE5;"><strong>🧑‍💻 联系我们</strong></h3>
		<p>
			欢迎大家也加入微信群，已有几个群已满，一起学习讨论webgl。加微信我拉进群
		</p>
		<p>
			<img
				src="https://icegl-1314935952.cos.ap-beijing.myqcloud.com/uploads/20230731/17d59bab46815cce1f4f1e09dcbb6ccc.png"
				width="300">
		</p>
	</div>
</template>
<script setup lang="ts">
import { FDivider } from '@fesjs/fes-design';

</script>

<style lang="less" scoped>
.article-text {
	line-height: 30px;
	margin-bottom: 15px;
	padding: 0px 20px;

	p {
		text-indent: 2em;
		/* 首行缩进2个字母的距离 */
	}

	img {
		margin: 10px auto;
		display: block;
		max-width: 100%;
		height: auto;
		cursor: zoom-in;
		-webkit-border-radius: 2px;
		-webkit-background-clip: padding-box;
		-moz-border-radius: 2px;
		-moz-background-clip: padding;
		border-radius: 2px;
		background-clip: padding-box;
	}
}
</style>
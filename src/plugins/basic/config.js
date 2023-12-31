/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 15:07:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-05 09:25:01
 */
export default {
	"name": "basic",
	"title": "原生功能展示",
	"intro": "",
	"version": "0.0.1",
	"author": "地虎降天龙",
	"website": "www.icegl.cn",
	"state": "active",
	"require": [],
	"child": [
		{
			"name": "base",
			"title": "基础",
			"intro": "基础功能展示",
			"pNode": "basic",
			"preview": [
				{ "src": "plugins/basic/base/preview/theGroups.png", "type": "img", "name": "theGroups", "title": "组合Group" },
				{ "src": "plugins/basic/base/preview/theConditional.png", "type": "img", "name": "theConditional", "title": "显隐v-if" },
				{ "src": "plugins/basic/base/preview/theBasic.png", "type": "img", "name": "theBasic", "title": "基本" },
				{ "src": "plugins/basic/base/preview/theEvents.png", "type": "img", "name": "theEvents", "title": "事件" },
				{ "src": "plugins/basic/base/preview/shaderParticles.png", "type": "img", "name": "shaderParticles", "title": "着色器实践" },
				{ "src": "plugins/basic/base/preview/penetrateEvent.png", "type": "img", "name": "penetrateEvent", "title": "穿透事件" }
			]
		}, {
			"name": "materials",
			"title": "材质",
			"intro": "各种衍生材质展示",
			"pNode": "basic",
			"preview": [
				{ "src": "plugins/basic/materials/preview/glassMaterial.png", "type": "img", "name": "glassMaterial", "title": "玻璃材质" },
				{ "src": "plugins/basic/materials/preview/wobbleMaterial.png", "type": "img", "name": "wobbleMaterial", "title": "流体波动" },
				{ "src": "plugins/basic/materials/preview/clippingMaterial.png", "type": "img", "name": "clippingMaterial", "title": "材质裁剪" },
			]
		}, {
			"name": "controls",
			"title": "控制器",
			"intro": "各种控制器",
			"pNode": "basic",
			"preview": [
				{ "src": "plugins/basic/controls/preview/cameraControls.png", "type": "img", "name": "cameraControls", "title": "摄像头控制" },
				{ "src": "plugins/basic/controls/preview/orbitControls.png", "type": "img", "name": "orbitControls", "title": "orbitControls" },
				{ "src": "plugins/basic/controls/preview/transformControls.png", "type": "img", "name": "transformControls", "title": "变换控制器" },
				{ "src": "与OrbitControls类似，该控件用于从鸟瞰视角在地图上变换相机，但使用鼠标/触摸交互的特定预设，并在默认情况下禁用屏幕空间平移。", "type": "text", "name": "mapControls", "title": "地图控制器" },
				{ "src": "第一人称视角，键盘控制视角。W、S、A、D：前后左右；空格：跳起；ESC：退出控制。", "type": "text", "name": "firstPersonControls", "title": "第一人称键盘控制" },
				{ "src": "plugins/basic/controls/preview/scrollControls.png", "type": "img", "name": "scrollControls", "title": "滚轮控制器" },
			]
		}, {
			"name": "htmls",
			"title": "内嵌dom",
			"intro": "内嵌网页元素",
			"pNode": "basic",
			"preview": [
				{ "src": "plugins/basic/htmls/preview/htmls.png", "type": "img", "name": "htmls", "title": "简单dom" },
				{ "src": "plugins/basic/htmls/preview/website.png", "type": "img", "name": "website", "title": "内嵌网页" },
				{ "src": "plugins/basic/htmls/preview/websiteReflector.png", "type": "img", "name": "websiteReflector", "title": "网页电脑+镜面" },
			]
		}, {
			"name": "shine",
			"title": "闪耀发光类",
			"intro": "关于物体发光的简单例子",
			"pNode": "basic",
			"preview": [
				{ "src": "plugins/basic/shine/preview/spriteImage.png", "type": "img", "name": "spriteImage", "title": "点精灵贴图" },
				{ "src": "plugins/basic/shine/preview/shader.png", "type": "img", "name": "shader", "title": "着色器方式" },
			]
		},
	]
}
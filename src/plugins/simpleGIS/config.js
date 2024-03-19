/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-23 16:40:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-19 08:32:13
 */

export default {
	"name": "simpleGIS",
	"title": "简单的GIS例子",
	"intro": "都是些GIS行业的应用简单例子",
	"version": "0.0.1",
	"author": "地虎降天龙",
	"website": "https://gitee.com/hawk86104",
	"state": "active",
	"require": [],
	"creatTime": "2024-02-12",
	"updateTime": "2024-03-19",
	"preview": [
		{ "src": "plugins/simpleGIS/preview/chinaMap.png", "type": "img", "name": "chinaMap", "title": "中国地图展示" },
		{
			"src": "plugins/simpleGIS/preview/jiangSuMap.png", "type": "img", "name": "jiangSuMap", "title": "江苏地图展示",
			referenceSource: { title: 'ouzexi', url: 'https://github.com/ouzexi/threejs-guangdong-map' }
		},
		{
			"src": "plugins/simpleGIS/preview/tileMap.png", "type": "img", "name": "tileMap", "title": "地图瓦片展示",
			referenceSource: { title: 'xianziljl', url: 'https://github.com/xianziljl/three-satellite-map' }
		},
		{
			"src": "plugins/simpleGIS/preview/renderer3DTiles.png", "type": "img", "name": "renderer3DTiles", "title": "3DTiles展示",
			referenceSource: { title: 'nasa-ammos', url: 'https://nasa-ammos.github.io/3DTilesRendererJS/' }
		},
		{ "src": "plugins/simpleGIS/preview/mapBuildings.gif", "type": "img", "name": "mapBuildings", "title": "地图和3DTiles结合" },
	]
}
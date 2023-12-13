/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-13 18:18:38
 */

import h337 from 'heatmap.js-fix'
import { MathUtils } from 'three'
// 放工具函数
const max = 36
const min = -10
export const getData = (heatmap, point) => {
	return heatmap.getValueAt(point) + min
}
export const setData = (heatmap, data) => {
	if (!data) {
		let i = 0
		data = [];
		while (i < 1000) {
			data.push({ x: MathUtils.randInt(1, heatmap._config.width), y: MathUtils.randInt(1, heatmap._config.height), value: MathUtils.randInt(min, max) });
			i++;
		}
	}
	heatmap.setData({
		max: max,
		min: min,
		data
	});
	// heatmap.setDataMin(20)
}
export const initHeatmap = (cW = 250, cH = 250, showCanvas = true) => {
	const heatmapCanvas = document.createElement("heatmap-canvas")
	heatmapCanvas.style.position = 'absolute'
	if (!showCanvas) {
		heatmapCanvas.style.display = 'none'
	}
	heatmapCanvas.style.top = '0'
	heatmapCanvas.style.left = '0'
	document.body.appendChild(heatmapCanvas)
	const heatmap = h337.create({
		container: heatmapCanvas,
		width: cW,
		height: cH,
		blur: '.8',
		radius: 10,
		gradient: {
			0.25: "rgb(0,0,255)",
			0.55: "rgb(0,255,0)",
			0.85: "yellow",
			1.0: "rgb(255,0,0)"
		}
	});
	return heatmap
}
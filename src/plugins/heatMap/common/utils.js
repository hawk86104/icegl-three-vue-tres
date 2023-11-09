
import h337 from 'heatmap.js-fix'
// 放工具函数
export const getRandom = (max, min) => Math.round((Math.random() * (max - min + 1) + min) * 10) / 10
export const setData = (heatmap, data) => {
	const max = 12
	if (!data) {
		let i = 0
		data = [];
		while (i < 2000) {
			data.push({ x: getRandom(1, heatmap._config.width), y: getRandom(1, heatmap._config.height), value: getRandom(1, 6) });
			i++;
		}
	}
	heatmap.setData({
		max,
		data
	});
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
		radius: 10
	});
	return heatmap
}
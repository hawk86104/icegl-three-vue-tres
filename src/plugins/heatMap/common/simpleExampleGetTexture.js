/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 19:04:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 20:50:20
 */
import { wrapYoyo } from 'gsap/all'
import * as THREE from 'three'

export const parms = {
	segments: 30,
	w: 256,
	h: 256,
}
// 随机给出温度值 储存在2维数组
const getTemperature = () => {
	const temperatureArray = new Array()
	for (let i = 0; i < parms.segments; i++) {
		temperatureArray[i] = parseInt(Math.random() * 25 + 10)
	}
	return temperatureArray
}

// 绘制辐射圆
const drawCircular = (context, opts) => {
	let { x, y, radius, weight } = opts
	radius = parseInt(radius * weight)

	// 创建圆设置填充色
	const rGradient = context.createRadialGradient(x, y, 0, x, y, radius)
	rGradient.addColorStop(0, "rgba(255, 255, 0, 1)")
	rGradient.addColorStop(1, "rgba(255, 0, 0, 0)")
	context.fillStyle = rGradient

	// 设置globalAlpha
	context.globalAlpha = weight
	context.beginPath()
	context.arc(x, y, radius, 0, 2 * Math.PI)
	context.closePath()

	context.fill()
}

export const getPaletteMap = () => {
	//颜色条的颜色分布
	const colorStops = {
		1.0: "#f00",
		0.8: "#e2fa00",
		0.6: "#33f900",
		0.3: "#0349df",
		0.0: "#fff"
	}

	//颜色条的大小
	const width = 256, height = 10

	// 创建canvas
	const paletteCanvas = document.createElement("canvas")
	paletteCanvas.width = width
	paletteCanvas.height = height
	paletteCanvas.style.position = 'absolute'
	paletteCanvas.style.top = '0'
	paletteCanvas.style.right = '0'
	const ctx = paletteCanvas.getContext("2d")

	// 创建线性渐变色
	const linearGradient = ctx.createLinearGradient(0, 0, width, 0)
	for (const key in colorStops) {
		linearGradient.addColorStop(key, colorStops[key])
	}

	// 绘制渐变色条
	ctx.fillStyle = linearGradient
	ctx.fillRect(0, 0, width, height)

	document.body.appendChild(paletteCanvas)

	const paletteTexture = new THREE.Texture(paletteCanvas)
	paletteTexture.minFilter = THREE.NearestFilter
	paletteTexture.needsUpdate = true

	return paletteTexture
}

// 获取透明度阶梯图 单色
export const getAlphaScaleMap = () => {
	const canvas = document.createElement("canvas")
	canvas.width = parms.w
	canvas.height = parms.h
	canvas.style.position = 'absolute'
	canvas.style.top = '20px'
	canvas.style.right = '0'
	const context = canvas.getContext("2d")
	// 随机生成温度
	const tenperature = getTemperature()
	// 绘制透明度阶梯图
	for (let i = 0; i < parms.segments; i++) {
		// 计算出当前温度占标准温度的权值
		const weight = tenperature[i] / 35
		const x = Math.random() * parms.w
		const y = Math.random() * parms.h
		drawCircular(context, {
			x,
			y,
			radius: 80,
			weight
		})
	}
	document.body.appendChild(canvas)
	const tex = new THREE.Texture(canvas)
	tex.minFilter = THREE.NearestFilter
	tex.needsUpdate = true
	return tex
}
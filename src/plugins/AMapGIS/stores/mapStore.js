/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 14:31:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-22 10:11:00
 */
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useMapStore = defineStore('mapStore', () => {
	const aMap = shallowRef(null)
	const mapHandle = shallowRef(null)
	const cameraState = shallowRef(null)

	//导出参数
	return { aMap, mapHandle, cameraState }
})
/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 14:31:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-21 14:47:27
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('mapStore', () => {
	const aMap = ref(null)
	const mapHandle = ref(null)

	//导出参数
	return { aMap, mapHandle }
})
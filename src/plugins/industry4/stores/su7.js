/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-16 09:59:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-16 10:13:52
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSu7Store = defineStore('Su7s', () => {
	const showColorList = ref(true)
	const selColorIndex = ref(0)
	const selColorData = ref('#26d6e9')
	function setShowColorList (show) {
		showColorList.value = show
	}
	function setSelColorIndex (v) {
		selColorIndex.value = v
	}

	return { showColorList, selColorIndex, setShowColorList, setSelColorIndex, selColorData }
})

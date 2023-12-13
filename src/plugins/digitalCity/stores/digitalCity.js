/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-13 19:36:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-13 19:57:25
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDigitalCityStore = defineStore('buildingsHeatmap', () => {
	const showDiv = ref(false)
	const temperature = ref(0)
	function setShowDiv (show) {
		showDiv.value = show
	}
	function setTemperature (v) {
		temperature.value = v
	}

	return { showDiv, temperature, setShowDiv, setTemperature }
})

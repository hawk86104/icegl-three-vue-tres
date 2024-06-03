/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-22 20:54:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-01 09:41:13
 */
import { useChartEditStore } from '../../stores/chartEditStore'

const getChartEditStore = () => { 
    return window['$vue']?useChartEditStore():null
}
let chartEditStore = getChartEditStore()
export const getSessionStorageInfo = (dataJson: any) => {
    const { editCanvasConfig, requestGlobalConfig, componentList } = dataJson as any
    if (!chartEditStore) {
        chartEditStore = getChartEditStore()
    }
    chartEditStore.editCanvasConfig = editCanvasConfig
    chartEditStore.requestGlobalConfig = requestGlobalConfig
    chartEditStore.componentList = componentList
    return dataJson
}
